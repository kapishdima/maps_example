import React from "react";
import { WineriesAPI, WineryService } from "processes/wineries";
import { useAxiosClient } from "app/hooks";

export const WineryServiceContext = React.createContext<WineryService>(null);

export const WineriesServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const wineriesService = new WineryService(new WineriesAPI(axiosClient));

    return (
        <WineryServiceContext.Provider value={wineriesService}>
            {children}
        </WineryServiceContext.Provider>
    );
};
