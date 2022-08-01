import { ApiClient } from "./services/ApiClient";
import GithubClient from "./services/GithubClient";

export const apiClient: ApiClient = new GithubClient({
    baseUrl: "https://api.github.com",
    token: process.env['REACT_APP_TOKEN'] as string | null
})