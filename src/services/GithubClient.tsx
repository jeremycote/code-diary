import axios from 'axios';
import Axios, { AxiosInstance } from 'axios';
import { Buffer } from 'buffer';
import { DiaryEntry } from '../types/DiaryEntry';
import { DiaryIndex } from '../types/DiaryIndex';
import { FullGithubAccount } from '../types/GithubAccount';
import { GithubApiConfiguration } from '../types/GithubApiConfiguration';
import { GithubFile } from '../types/GithubFile';
import { GithubTokenResponse } from '../types/GithubTokenResponse';
import { ApiClient } from './ApiClient';
export default class GithubClient implements ApiClient {
  private client: AxiosInstance | null = null;

  private user: FullGithubAccount | null = null;

  private apiConfiguration!: GithubApiConfiguration;

  constructor(apiConfiguration: GithubApiConfiguration) {
    this.apiConfiguration = apiConfiguration;
  }

  public async setupClient(code: string, state: string) {
    console.log("Setting up client")
    this.getTokens(code, state).then(tokens => {
      if (tokens) {
        this.client = this.createClient(tokens!.access_token);
        this.getSignedInUser().then(user => {
          if (user) {
            this.user = user;
            console.log(`Successfully logged in as ${this.user.login}`);
          } else {
            console.error('Failed to get user from github.');
          }
        });
      }
    });
  }

  protected createClient(access_token: string): AxiosInstance {
    return Axios.create({
      baseURL: this.apiConfiguration.apiBaseUrl,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...(access_token && {
          Authorization: `Token ${access_token}`
        })
      },
      timeout: 10 * 1000 // 10 * 1000ms = 10s
    });
  }

  public login() {
    window.location.href = `${this.apiConfiguration.oauthUrl}/authorize?client_id=${this.apiConfiguration.clientId}&redirect_uri=${this.apiConfiguration.appBaseUrl}/login/callback&state=${this.apiConfiguration.state}`;
  }

  private async getTokens(code: string, state: string): Promise<GithubTokenResponse | null> {
    console.log("getTokens: validating state")
    if (this.validateState(state)) {
      try {
        console.log("Valid state, getting tokens")
        const response = await axios.post<GithubTokenResponse>(
          `${this.apiConfiguration.oauthUrl}/access_token?client_id=${this.apiConfiguration.clientId}&client_secret=${this.apiConfiguration.clientSecret}&code=${code}&state=${this.apiConfiguration.state}`
        );
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.log("Failed to get tokens")
        console.error(error);
      }
    }

    return null;
  }

  private validateState(state: string): boolean {
    return this.apiConfiguration.state === state;
  }

  async getIndex(): Promise<DiaryIndex | null> {
    if (this.client === null) {
      return null;
    }

    try {
      const response = await this.client.get<GithubFile>('/repos/jeremycote/code-diary-data/contents/index.json');
      //TODO: Verify data cast
      const buffer = Buffer.from(response.data.content, 'base64');
      const index: DiaryIndex = JSON.parse(buffer.toString());
      return index;
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  async getEntries(path: string): Promise<DiaryEntry[]> {
    const index = await this.getIndex();
    if (index) {
      return index.entries;
    } else {
      return [];
    }
  }

  async getSignedInUser(): Promise<FullGithubAccount | null> {
    if (this.client === null) {
      return null;
    }

    try {
      const response = await this.client.get<FullGithubAccount>('/user');
      return response.data;
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  async getFile(path: string): Promise<GithubFile | null> {
    if (this.client === null) {
      return null;
    }

    try {
      // if (this.user === null) {
      //   throw Error("You are not logged in")
      // }
      // const response = await this.client.get<GithubFile>(`repos/${this.user!.login}/code-diary-data/${path}`)
      const response = await this.client.get<GithubFile>(`/repos/jeremycote/code-diary-data/contents/entries/${path}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }

    return null;
  }
}
