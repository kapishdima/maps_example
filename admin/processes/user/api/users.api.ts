import { UserDomainEntity } from "entities/user";
import { IAPIClient } from "shared/api";

export class UsersAPI {
    constructor(private readonly client: IAPIClient) {}

    public async getUsers(): Promise<UserDomainEntity[]> {
        const { data: users } = await this.client.get<UserDomainEntity[]>(
            "/api/admin"
        );

        return users;
    }
}
