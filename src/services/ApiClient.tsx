import { DiaryEntry } from "../types/DiaryEntry";
import { DiaryIndex } from "../types/DiaryIndex";
import { Repository } from "../types/Github/Repository";
import { FullGithubAccount } from "../types/GithubAccount";
import { GithubFile } from "../types/GithubFile";

export default interface ApiClient {
  getUser(): Promise<FullGithubAccount | null>;
  getIndex(): Promise<DiaryIndex | null>;
  getEntries(path: string): Promise<DiaryEntry[]>;
  getFile(path: string): Promise<GithubFile | null>;
  login(): void;
  getUserRepositories(): Promise<Repository[] | null>;
}