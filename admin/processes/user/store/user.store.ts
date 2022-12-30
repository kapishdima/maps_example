import { UserResponseEntity, UserDomainEntity } from "entities/user";

export interface IUserStore {
    saveUser: (user: UserDomainEntity) => UserDomainEntity;
    getUser: () => UserDomainEntity;
    deleteUser: () => void;
}

export class UserStore implements IUserStore {
    USER_STORE_KEY = "sea_of_wine/user";

    constructor() {}

    saveUser(user: UserDomainEntity): UserDomainEntity {
        localStorage.setItem(this.USER_STORE_KEY, JSON.stringify(user));

        return this.getUser();
    }

    getUser(): UserDomainEntity {
        return JSON.parse(localStorage.getItem(this.USER_STORE_KEY));
    }

    deleteUser() {
        return localStorage.removeItem(this.USER_STORE_KEY);
    }
}
