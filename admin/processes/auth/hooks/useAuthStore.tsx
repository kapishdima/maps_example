import React from "react";
import { authStoreContext } from "../store/auth";

export const useAuthStore = () => {
    return React.useContext(authStoreContext);
};
