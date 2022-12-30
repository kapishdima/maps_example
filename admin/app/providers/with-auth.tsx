import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";

import { Loading } from "shared/ui";
import { useAuthStore, useCheckAuth, useGetMe } from "processes/auth";

export const withAuth = (Component: React.ComponentType<any>) =>
    observer(() => {
        const location = useLocation();
        const authStore = useAuthStore();

        const { checkAuth } = useCheckAuth();
        const { fetchUser } = useGetMe();

        const checkingAuthAndPrepareUser = async () => {
            const isAuthorized = checkAuth();

            if (isAuthorized) {
                const user = await fetchUser();
                authStore.setUser(user);
            }
        };

        const isLoginPage = () => location.pathname.includes("/login");

        useEffect(() => {
            if (!isLoginPage()) {
                checkingAuthAndPrepareUser();
            }
        }, [authStore.authorizationStatus]);

        if (
            !isLoginPage() &&
            !authStore.authorizationStatus &&
            !authStore.user
        ) {
            return (
                <Loading
                    minHeight="100vh"
                    minWidth="100vw"
                    title="Cheking user authorizion"
                />
            );
        }

        return <Component />;
    });
