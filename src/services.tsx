import { GithubApiConfiguration } from './types/GithubApiConfiguration';

const baseUrl: string = process.env['REACT_APP_BASE_URL'] ?? '';
const clientId: string = process.env['REACT_APP_API_CLIENT_ID'] ?? '';
const apiBaseUrl: string = process.env['REACT_APP_API_BASE_URL'] ?? '';
const apiState: string = process.env['REACT_APP_API_STATE'] ?? '';
const azureUrl: string = process.env['REACT_APP_AZURE_API_URL'] ?? '';
const oauthUrl: string = process.env['REACT_APP_OAUTH_URL'] ?? '';

if (baseUrl === '') {
  console.error('baseURL is undefined');
}

if (clientId === '') {
  console.error('clientId is undefined');
}

if (apiBaseUrl === '') {
  console.error('apiBaseURL is undefined');
}

if (apiState === '') {
  console.error('apiState is undefined');
}

if (azureUrl === '') {
  console.error('azureApiURL is undefined');
}

if (oauthUrl === '') {
  console.error('oauthURL is undefined');
}

export const apiConfiguration: GithubApiConfiguration = {
  apiBaseUrl: apiBaseUrl,
  clientId: clientId,
  appBaseUrl: baseUrl,
  oauthUrl: oauthUrl,
  azureUrl: azureUrl,
  state: apiState
};
