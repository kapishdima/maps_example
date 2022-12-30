import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useAxiosClient, useCommonData } from "app/hooks";
import { toDomainEntity, UserResponseEntity } from "entities/user";
import { AuthToken } from "entities/token";

import { LoginAPI, LoginCredentials } from "processes/login";
import { UserService, UserStore } from "processes/user";
import { useAuthStore } from "processes/auth";

import { LocationState } from "shared/types/location";
import { createErrorNotification } from "shared/ui";
import { useMutation } from "react-query";

export const useLogin = () => {
    const axiosClient = useAxiosClient();
    const loginAPI = new LoginAPI(axiosClient);
    const userService = new UserService(new UserStore());
    const authStore = useAuthStore();

    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as LocationState;
    const from = state?.from?.pathname || "/";

    const { mutate: login, isLoading } = useMutation(
        async (credentials: LoginCredentials) =>
            await loginAPI.login(credentials),
        {
            onSuccess: (user: UserResponseEntity) => {
                authStore.setAuthorized();
                authStore.setUser(toDomainEntity(user));
                userService.saveUser(user);
                navigate(from.includes("login") ? "/" : from, {
                    replace: true,
                });
            },
            onError: (error: any) => {
                if (error.status === 401) {
                    authStore.setUnauthorized();
                    createErrorNotification({
                        title: "Email or password is invalid",
                    });
                }
            },
        }
    );

    useEffect(() => {
        authStore.setUnauthorized();
        userService.deleteUser();
        new AuthToken().clear();
    }, []);

    return { login, isLoading };
};
