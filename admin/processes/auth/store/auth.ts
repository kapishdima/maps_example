import React from "react";

import { action, makeObservable, observable } from "mobx";

import { AuthStatusTypes } from "../model/auth-status";
import { UserDomainEntity } from "entities/user";

export interface IAuthStore {
    getAuthorizationStatus: () => AuthStatusTypes;
    setAuthorized: () => void;
    setUnauthorized: () => void;
    setUser: (user: UserDomainEntity) => void;
    removeUser: () => void;
}

export class AuthStore implements IAuthStore {
    authorizationStatus: AuthStatusTypes = null;
    user: UserDomainEntity = null;

    constructor() {
        makeObservable(this, {
            user: observable,
            authorizationStatus: observable,
            setAuthorized: action("Set authorized status"),
            setUnauthorized: action("Set unauthorized status"),
            setUser: action("Set user from store or api"),
            removeUser: action("Remove user"),
        });
    }

    setAuthorized() {
        this.authorizationStatus = AuthStatusTypes.AUTHORIZED;
        return true;
    }
    setUnauthorized() {
        this.authorizationStatus = AuthStatusTypes.UNAUTHORIZED;
        return false;
    }

    setUser(user: UserDomainEntity) {
        this.user = user;
    }

    removeUser() {
        this.user = null;
    }

    getAuthorizationStatus() {
        return this.authorizationStatus;
    }

    isSuperAdmin() {
        return this.user.role === "superadmin";
    }
}

export const authStoreContext = React.createContext(new AuthStore());
