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
  
  private isReady: boolean = false;

  public getIsReady(): boolean {
    return this.isReady;
  }
  
  private client: AxiosInstance | null = null;

  private user: FullGithubAccount | null = null;

  private apiConfiguration!: GithubApiConfiguration;

  constructor(apiConfiguration: GithubApiConfiguration) {
    this.apiConfiguration = apiConfiguration;
    this._setupClient()
  }

  private async _setupClient(): Promise<void> {
    // Check if user is already authenticated

    // If not, get new creds and dump them into local storage

    // Creds exist, create the client
  }

  public async setupClient(code: string, state: string): Promise<boolean> {
    console.log('Setting up client');
    const newTokens = await this.getTokens(code, state);

    if (newTokens) {
      this.setTokens(newTokens);

      this.client = this.createClient(this.getAccessToken());

      this.getSignedInUser().then(user => {
        if (user) {
          this.user = user;
          console.log(`Successfully logged in as ${this.user.login}`);
        } else {
          console.error('Failed to get user from github.');
        }
      });

      return true;
    }

    return false;
  }

  protected setTokens(tokens: GithubTokenResponse): void {
    
    Object.entries(tokens)
    .forEach(([key, value]) => {
      
      // Save expiration date in seconds
      if (key.indexOf('expires_in') !== -1) {
        const d = new Date();
        console.log(value)
        d.setSeconds(d.getSeconds() + (value as number))
        window.localStorage.setItem(key.replace('expires_in', 'expires_on'), d.toISOString())
      }
      
      window.localStorage.setItem(key, `${value}`)
    })
  }

  protected getAccessToken(): string {
    return window.localStorage.getItem('access_token') ?? ""
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
    console.log('getTokens: validating state');
    if (this.validateState(state)) {
      try {
        const response = await axios.post<GithubTokenResponse>(
          `${this.apiConfiguration.azureUrl}/AuthorizeCodeDiaryGithub?github_code=${code}`
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
