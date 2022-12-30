import { UserResponseEntity } from "entities/user";

import { AuthResponse } from "../model/auth-response";
import { AuthStatusTypes } from "../model/auth-status";

import { IAPIClient } from "shared/api";

export interface IAuthAPI {
    logout: () => Promise<void>;
    getMeInfo: () => Promise<UserResponseEntity>;
    isAuthorized: () => Promise<AuthResponse>;
}

export class AuthAPI implements IAuthAPI {
    constructor(private readonly client: IAPIClient) {}

    public async logout(): Promise<void> {
        await this.client.post("/api/logout");
    }

    public async getMeInfo(): Promise<UserResponseEntity> {
        const { data: user } = await this.client.get<UserResponseEntity>(
            "/api/user"
        );

        return user;
    }

    public async isAuthorized(): Promise<AuthResponse> {
        const user = await this.getMeInfo();

        return this.sendAuthResponse(user);
    }

    private sendAuthResponse(user): AuthResponse {
        return {
            user,
            status: Boolean(user)
                ? AuthStatusTypes.AUTHORIZED
                : AuthStatusTypes.UNAUTHORIZED,
        };
    }
}
