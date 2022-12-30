import { AuthAPI, IAuthAPI } from "./api/auth";
import { useGetMe } from "./hooks/useGetMe";
import { useLogout } from "./hooks/useLogout";
import { useAuthStore } from "./hooks/useAuthStore";
import { useCheckAuth } from "./hooks/useCheckAuth";

import { AuthResponse } from "./model/auth-response";
import {
    AuthStatusTypes,
    isAuthorized,
    isUnauthorized,
} from "./model/auth-status";

import { AuthStore } from "./store/auth";
import { AuthService } from "./services/auth.service";

export {
    IAuthAPI,
    AuthAPI,
    AuthResponse,
    AuthStatusTypes,
    AuthStore,
    isAuthorized,
    isUnauthorized,
    AuthService,
    useGetMe,
    useLogout,
    useAuthStore,
    useCheckAuth,
};
