import { UserResponseEntity } from "entities/user";
import { AuthToken } from "entities/token";

import { IAuthAPI } from "../api/auth";

export class AuthService {
    constructor(private readonly authAPI: IAuthAPI) {}

    public async logout() {
        return await this.authAPI.logout();
    }

    public async getMe(): Promise<UserResponseEntity> {
        const user = await this.authAPI.getMeInfo();

        return user;
    }

    public getAuthToken(): string {
        return new AuthToken().read();
    }
}
