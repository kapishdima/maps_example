import React, { useEffect } from "react";

import { observer } from "mobx-react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthStatusTypes, useAuthStore, useCheckAuth } from "processes/auth";

export const Protected: React.FC = observer(({ children }) => {
    const authStore = useAuthStore();
    const location = useLocation();
    const { checkAuth } = useCheckAuth();

    useEffect(() => {
        checkAuth();
    }, [location.pathname]);

    if (authStore.authorizationStatus === AuthStatusTypes.UNAUTHORIZED) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
});
