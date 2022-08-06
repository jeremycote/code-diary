import { DiaryEntry } from "../types/DiaryEntry";
import { DiaryIndex } from "../types/DiaryIndex";
import { GithubAccount } from "../types/GithubAccount";
import { GithubFile } from "../types/GithubFile";
export interface ApiClient {
  getSignedInUser(): Promise<GithubAccount | null>;
  getIndex(): Promise<DiaryIndex | null>;
  getEntries(path: string): Promise<DiaryEntry[]>;
  getFile(path: string): Promise<GithubFile | null>;
  login(): void
}
