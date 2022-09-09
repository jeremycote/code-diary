import Axios from 'axios';
import axios from 'axios';
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/login/Login';
import LoginCallback from '../components/loginCallback/LoginCallback';
import ApiClient from '../services/ApiClient';
import GithubClient from '../services/GithubClient';
import { FullGithubAccount } from '../types/GithubAccount';
import { GithubApiConfiguration } from '../types/GithubApiConfiguration';
import { GithubTokenResponse } from '../types/GithubTokenResponse';
import { ConfigContext } from './ConfigContextProvider';

export type ApiContextType = {
  user: FullGithubAccount | null;
  client: ApiClient | null;
  setupClient: (code: string, state: string) => Promise<boolean>;
  login: () => void;
};

export const ApiContext = createContext<ApiContextType>({
  user: null,
  client: null,
  setupClient: async (code, state) => false,
  login: () => {}
});

type ApiContextProviderProps = {
  children: JSX.Element;
  apiConfiguration: GithubApiConfiguration;
};

const ApiContextProvider = ({ children, apiConfiguration }: ApiContextProviderProps) => {
  const [user, setUser] = useState<FullGithubAccount | null>(null);

  const [client, setClient] = useState<ApiClient | null>(null);

  useEffect(() => {
    if (client) {
      client.getUser().then(user => {
        setUser(user);
      });
    } else {
      setUser(null);
    }
  }, [client]);

  const login = () => {
    window.location.href = `${apiConfiguration.oauthUrl}/authorize?client_id=${apiConfiguration.clientId}&redirect_uri=${apiConfiguration.appBaseUrl}/login/callback&state=${apiConfiguration.state}`;
  };

  const setupClient = async (code: string, state: string): Promise<boolean> => {
    if (apiConfiguration == null) {
      return false;
    }

    const t = await _getTokens(code, state);

    console.log(t);

    if (t && t.access_token) {
      console.log('Attempting to create GithubClient using token ' + t.access_token);
      setClient(new GithubClient(apiConfiguration, t.access_token));
      return true;
    } else {
      console.error('Failed to createClient');
    }

    return false;
  };

  const _getTokens = async (code: string, state: string): Promise<GithubTokenResponse | null> => {
    console.log('getTokens: validating state');
    if (validateState(state)) {
      try {
        const response = await axios.post<GithubTokenResponse>(
          `${apiConfiguration.azureUrl}/AuthorizeCodeDiaryGithub?github_code=${code}`
        );

        console.log(`Here is your access_token: ${response.data.access_token}`);

        if (response.data.access_token === null || response.data.access_token === undefined) {
          return null;
        }

        return response.data;
      } catch (error) {
        console.log('Failed to get tokens');
        console.error(error);
      }
    }

    return null;
  };

  const validateState = (state: string): boolean => {
    return apiConfiguration.state === state;
  };

  const setTokens = (tokens: GithubTokenResponse): void => {
    Object.entries(tokens).forEach(([key, value]) => {
      // Save expiration date in seconds
      if (key.indexOf('expires_in') !== -1) {
        const d = new Date();
        console.log(value);
        d.setSeconds(d.getSeconds() + (value as number));
        window.localStorage.setItem(key.replace('expires_in', 'expires_on'), d.toISOString());
      }

      window.localStorage.setItem(key, `${value}`);
    });
  };

  const getAccessToken = () => {
    return window.localStorage.getItem('access_token') ?? '';
  };

  return (
    <ApiContext.Provider
      value={{
        user,
        client,
        setupClient,
        login
      }}
    >
      {user && client ? (
        <>{children}</>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/login/callback" element={<LoginCallback />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
