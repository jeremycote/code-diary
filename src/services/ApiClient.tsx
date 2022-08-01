import { GithubAccount } from "../types/GithubAccount"

export interface ApiClient {
    getSignedInUser(): Promise<GithubAccount | null>
}