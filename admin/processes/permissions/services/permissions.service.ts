import { UserDomainEntity } from "entities/user";
import { IUserStore, UserStore } from "processes/user";

import { permissions } from "app/permissions";

export class PermissionsService {
    private user: UserDomainEntity;
    private userStore: IUserStore;

    constructor() {
        this.userStore = new UserStore(); // TODO: replace user service to useGetMe hook, who return user from store or api
        this.user = this.userStore.getUser();
    }

    public isAllowTo(action: string) {
        if (!this.user) {
            return null;
        }
        const role = this.user.role;
        const permissionsForRole = permissions[role];

        if (!permissionsForRole) {
            return false;
        }
        return permissionsForRole.includes(action);
    }
}
