import { useAuthService } from "app/hooks";
import { useMutation } from "react-query";

export const useLogout = (onLogoutSuccess: () => void) => {
    const authService = useAuthService();

    const {
        mutate: logout,
        isLoading,
        isSuccess,
        isIdle,
    } = useMutation(() => authService.logout(), {
        onSuccess: onLogoutSuccess,
    });

    return { logout, isLoading, isIdle, isSuccess };
};
