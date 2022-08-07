import { ApiClient } from "./services/ApiClient";
import GithubClient from "./services/GithubClient";

const baseURL: string = process.env['REACT_APP_BASE_URL'] ?? ""
const clientId: string = process.env['REACT_APP_API_CLIENT_ID'] ?? ""
const apiBaseURL: string = process.env['REACT_APP_API_BASE_URL'] ?? ""
const clientSecret: string = process.env['REACT_APP_API_CLIENT_SECRET'] ?? ""
const apiState: string = process.env['REACT_APP_API_STATE'] ?? ""

if (baseURL === "") {
    console.error("baseURL is undefined")
}

if (clientId === "") {
    console.error("clientId is undefined")
}

if (apiBaseURL === "") {
    console.error("apiBaseURL is undefined")
}

if (clientSecret === "") {
    console.error("clientSecret is undefined")
}

if (apiState === "") {
    console.error("apiState is undefined")
}


export const apiClient: ApiClient = new GithubClient({
    apiBaseUrl: apiBaseURL,
    clientId: clientId,
    appBaseUrl: baseURL,
    oauthUrl: "https://github.com/login/oauth",
    state: apiState,
    clientSecret: clientSecret
})