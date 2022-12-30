import React from "react";
import { SeodatasAPI, SeodataService } from "processes/seodatas";
import { useAxiosClient } from "app/hooks";

export const SeodataServiceContext = React.createContext<SeodataService>(null);

export const SeodatasServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const seodatasService = new SeodataService(new SeodatasAPI(axiosClient));

    return (
        <SeodataServiceContext.Provider value={seodatasService}>
            {children}
        </SeodataServiceContext.Provider>
    );
};
