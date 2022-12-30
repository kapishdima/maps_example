import { PermissionsService } from "../services/permissions.service";

export const usePermission = (action: string) => {
    const permissionsService = new PermissionsService();

    return permissionsService.isAllowTo(action);
};
