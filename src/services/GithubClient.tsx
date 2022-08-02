import { GithubAccount } from "../types/GithubAccount";
import Axios, { AxiosInstance } from "axios";
import { ApiClient } from "./ApiClient";
import { GithubApiConfiguration } from "../types/GithubApiConfiguration";
import { DiaryEntry } from "../types/DiaryEntry";
import { GithubFile } from "../types/GithubFile";
import { DiaryIndex } from "../types/DiaryIndex";
import { Buffer } from 'buffer';
export default class GithubClient implements ApiClient {
  private client: AxiosInstance;

  protected createClient(
    apiConfiguration: GithubApiConfiguration
  ): AxiosInstance {
    console.log(`Token ${apiConfiguration.token}`);

    return Axios.create({
      baseURL: apiConfiguration.baseUrl,
      responseType: "json" as const,
      headers: {
        "Content-Type": "application/json",
        ...(apiConfiguration.token && {
          Authorization: `Token ${apiConfiguration.token}`,
        }),
      },
      timeout: 10 * 1000, // 10 * 1000ms = 10s
    });
  }

  constructor(apiConfiguration: GithubApiConfiguration) {
    this.client = this.createClient(apiConfiguration);
  }

  async getIndex(): Promise<DiaryIndex | null> {
    try {
      const response = await this.client.get<GithubFile>(
        "/repos/jeremycote/code-diary-data/contents/index.json"
      );
      //TODO: Verify data cast
      const buffer = Buffer.from(response.data.content, "base64");
      const index: DiaryIndex = JSON.parse(buffer.toString());
      return index;
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  async getEntries(path: string): Promise<DiaryEntry[]> {
      const index = await this.getIndex()
      if (index) {
        return index.entries
      } else {
        return []
      }
  }

  async getSignedInUser(): Promise<GithubAccount | null> {
    try {
      const response = await this.client.get<GithubAccount>("/user");
      return response.data;
    } catch (error) {
      console.log(error);
    }

    return null;
  }
}
