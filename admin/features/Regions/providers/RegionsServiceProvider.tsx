import React from "react";
import { RegionsService, RegionsAPI } from "processes/regions";
import { useAxiosClient } from "app/hooks";

export const RegionsServiceContext = React.createContext<RegionsService>(null);

export const RegionsServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const regionsService = new RegionsService(new RegionsAPI(axiosClient));

    return (
        <RegionsServiceContext.Provider value={regionsService}>
            {children}
        </RegionsServiceContext.Provider>
    );
};
