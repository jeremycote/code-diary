import { ApiClient } from "./services/ApiClient";
import GithubClient from "./services/GithubClient";

const clientId: string = process.env['REACT_APP_GITHUB_CLIENT_ID'] === undefined ? "" : process.env['REACT_APP_GITHUB_CLIENT_ID']

if (clientId === "") {
    console.error("clientId is undefined")
}

export const apiClient: ApiClient = new GithubClient({
    baseUrl: "https://api.github.com",
    clientId: clientId
})