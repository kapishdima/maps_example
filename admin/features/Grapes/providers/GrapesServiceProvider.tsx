import React from "react";
import { GrapesAPI, GrapeService } from "processes/grapes";
import { useAxiosClient } from "app/hooks";

export const GrapeServiceContext = React.createContext<GrapeService>(null);

export const GrapesServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const grapesService = new GrapeService(new GrapesAPI(axiosClient));

    return (
        <GrapeServiceContext.Provider value={grapesService}>
            {children}
        </GrapeServiceContext.Provider>
    );
};
