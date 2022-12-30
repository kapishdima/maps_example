import React from "react";
import { AgenciesAPI, AgencyService } from "processes/agencies";
import { useAxiosClient } from "app/hooks";

export const AgencyServiceContext = React.createContext<AgencyService>(null);

export const AgenciesServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const agenciesService = new AgencyService(new AgenciesAPI(axiosClient));

    return (
        <AgencyServiceContext.Provider value={agenciesService}>
            {children}
        </AgencyServiceContext.Provider>
    );
};
