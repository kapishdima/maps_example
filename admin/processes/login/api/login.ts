import { UserResponseEntity } from "entities/user";
import { AuthToken } from "entities/token";
import { IAPIClient } from "shared/api";

import { LoginCredentials } from "../model/login-credentials";
import { LoginResponse } from "../model/login-response";

export interface ILoginAPI {
    login: (credentials: LoginCredentials) => Promise<UserResponseEntity>;
}

export class LoginAPI implements ILoginAPI {
    constructor(private readonly client: IAPIClient) {}

    public async login(
        credentials: LoginCredentials
    ): Promise<UserResponseEntity> {
        await this.getCSRFToken();

        const { admin, token } = await this.sendLoginRequest(credentials);
        this.createAndSaveAuthToken(token);

        this.client.createRequestInterceptorWithAuthToken();

        return admin;
    }

    private async sendLoginRequest(credentials: LoginCredentials) {
        const { data } = await this.client.post<LoginResponse>(`/api/login`, {
            email: credentials.email,
            password: credentials.password,
        });

        return { admin: data.admin, token: data.token };
    }

    private createAndSaveAuthToken(token: string) {
        const authToken = new AuthToken();

        authToken.clear();
        authToken.save(token);

        return authToken;
    }

    private async getCSRFToken() {
        return await this.client.get("/sanctum/csrf-cookie");
    }
}
