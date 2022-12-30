import { handleError } from "app/errors";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { AuthToken } from "entities/token";

export type APIResponse<R> = {
    data: R;
};

export interface IAPIClient {
    get: <R>(url: string) => Promise<APIResponse<R>>;
    post: <R, D = any>(url, payload?: D) => Promise<APIResponse<R>>;
    patch: <R, D = any>(url, payload: D) => Promise<APIResponse<R>>;
    delete: <R>(url) => Promise<APIResponse<R>>;
    createRequestInterceptorWithAuthToken: () => void;
}

export class AxiosClient implements IAPIClient {
    private client: AxiosInstance;

    constructor(axiosConfig: AxiosRequestConfig) {
        this.client = axios.create(axiosConfig);

        this.createRequestInterceptorWithAuthToken();
        this.createResponseInterceptor();
    }

    async get<R>(url): Promise<APIResponse<R>> {
        const { data } = await this.client.get<R>(url);

        return { data };
    }

    async post<R, D>(url: string, payload: D): Promise<APIResponse<R>> {
        const { data } = await this.client.post<R>(url, payload);

        return { data };
    }

    async patch<R, D>(url, payload: D): Promise<APIResponse<R>> {
        const { data } = await this.client.patch<R>(url, payload);

        return { data };
    }

    async delete<R>(url: string): Promise<APIResponse<R>> {
        const { data, headers } = await this.client.delete(url);
        return { data };
    }

    private createResponseInterceptor() {
        this.client.interceptors.response.use(
            (request) => request,
            (error) => {
                const errorJson = error.toJSON();

                handleError(errorJson);

                return Promise.reject(errorJson);
            }
        );
    }

    public createRequestInterceptorWithAuthToken() {
        this.client.interceptors.request.use((request) => {
            const authToken = new AuthToken().read();

            if (!authToken) {
                return request;
            }
            if (request.url.includes("login")) {
                return request;
            }

            const headers = request.headers;
            return {
                ...request,
                headers: { ...headers, Authorization: `Bearer ${authToken}` },
            };
        });
    }
}
