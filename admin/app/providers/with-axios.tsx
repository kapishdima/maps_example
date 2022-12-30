import React from "react";

import { AxiosClient } from "shared/api";
import { apiConfig } from "app/config";

export const AxiosClientContext = React.createContext(null);

export const withAxios = (Component: React.ComponentType<any>) => () => {
    const axiosClient = new AxiosClient(apiConfig);

    return (
        <AxiosClientContext.Provider value={axiosClient}>
            <Component />
        </AxiosClientContext.Provider>
    );
};
