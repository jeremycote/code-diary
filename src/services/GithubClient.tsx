import { GithubAccount } from "../types/GithubAccount";
import React from "react";
import { ConfigContext, ConfigContextType } from "../context/ConfigContextProvider";
import Axios, { AxiosInstance } from "axios";
import { ApiClient } from "./ApiClient";
import { GithubApiConfiguration } from "../types/GithubApiConfiguration";

export default class GithubClient implements ApiClient{
    private client: AxiosInstance;

    protected createClient(apiConfiguration: GithubApiConfiguration): AxiosInstance {
        return Axios.create({
            baseURL: apiConfiguration.baseUrl,
            responseType: "json" as const,
            headers: {
                "Content-Type": "application/json",
                ...(apiConfiguration.token && {"Authorization": `Token ${apiConfiguration.token}`})
            },
            timeout: 10 * 1000 // 10 * 1000ms = 10s
        });
    }

    constructor(apiConfiguration: GithubApiConfiguration) {
        this.client = this.createClient(apiConfiguration);
    }

    async getSignedInUser(): Promise<GithubAccount | null> {
        try {
            const response = await this.client.get<GithubAccount>("/user");
            return response.data;
        } catch (error) {
            console.log(error);
        }

        return null
    }
}