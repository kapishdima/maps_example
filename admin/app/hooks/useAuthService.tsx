import { AuthAPI, AuthService, useAuthStore } from "processes/auth";

import { useAxiosClient } from "./useAxiosClient";

export const useAuthService = () => {
    const axiosClient = useAxiosClient();

    const authAPI = new AuthAPI(axiosClient);
    const authService = new AuthService(authAPI);

    return authService;
};
