import axios from 'axios';
import Axios, { AxiosInstance } from 'axios';
import { Buffer } from 'buffer';
import { DiaryEntry } from '../types/DiaryEntry';
import { DiaryIndex } from '../types/DiaryIndex';
import { Repository } from '../types/Github/Repository';
import { FullGithubAccount } from '../types/GithubAccount';
import { GithubApiConfiguration } from '../types/GithubApiConfiguration';
import { GithubFile } from '../types/GithubFile';
import { GithubTokenResponse } from '../types/GithubTokenResponse';
import ApiClient from './ApiClient';

export default class GithubClient implements ApiClient {
  private isReady: boolean = false;

  public getIsReady(): boolean {
    return this.isReady;
  }

  private client: AxiosInstance | null = null;

  private user: FullGithubAccount | null = null;

  private apiConfiguration!: GithubApiConfiguration;

  constructor(apiConfiguration: GithubApiConfiguration, access_token: string) {
    this.apiConfiguration = apiConfiguration;
    this.client = this.createClient(access_token);
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

  async getUser(): Promise<FullGithubAccount | null> {
    if (this.client === null) {
      console.error('this.client is null. Unable to fetch user.');
      return null;
    }

    try {
      console.log('GET /user');
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

  public async getUserRepositories(): Promise<Repository[] | null> {
    if (this.client === null) {
      return null;
    }

    try {
      const response = await this.client.get<Repository[]>('/user/repos');
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
