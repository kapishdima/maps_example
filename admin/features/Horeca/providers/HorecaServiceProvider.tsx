import React from "react";
import { HorecasAPI, HorecaService } from "processes/horeca";
import { useAxiosClient } from "app/hooks";

export const HorecaServiceContext = React.createContext<HorecaService>(null);

export const HorecaServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const horecaService = new HorecaService(new HorecasAPI(axiosClient));

    return (
        <HorecaServiceContext.Provider value={horecaService}>
            {children}
        </HorecaServiceContext.Provider>
    );
};
