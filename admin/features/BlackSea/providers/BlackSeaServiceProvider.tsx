import React from "react";
import { BlackSeaAPI, BlackSeaService } from "processes/blackSea";
import { useAxiosClient } from "app/hooks";

export const BlackSeaServiceContext =
    React.createContext<BlackSeaService>(null);

export const BlackSeaServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const blackSeaService = new BlackSeaService(new BlackSeaAPI(axiosClient));

    return (
        <BlackSeaServiceContext.Provider value={blackSeaService}>
            {children}
        </BlackSeaServiceContext.Provider>
    );
};
