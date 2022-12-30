import { useAuthService } from "app/hooks";
import { useAuthStore } from "./useAuthStore";

export const useCheckAuth = () => {
    const authService = useAuthService();
    const authStore = useAuthStore();

    const checkAuth = async () => {
        const token = authService.getAuthToken();
        if (!token) {
            return authStore.setUnauthorized();
        }

        return authStore.setAuthorized();
    };

    return {
        checkAuth,
    };
};
