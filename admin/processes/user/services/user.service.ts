import {
    toDomainEntity,
    UserDomainEntity,
    UserResponseEntity,
} from "entities/user";

import { IUserStore } from "../store/user.store";

export class UserService {
    constructor(private readonly userStore: IUserStore) {}

    saveUser(user: UserResponseEntity) {
        return this.userStore.saveUser(toDomainEntity(user));
    }

    getUser(): UserDomainEntity {
        return this.userStore.getUser();
    }

    deleteUser() {
        return this.userStore.deleteUser();
    }
}
