import React from "react";
import { AttractionsAPI, AttractionService } from "processes/attractions";
import { useAxiosClient } from "app/hooks";

export const AttractionServiceContext =
    React.createContext<AttractionService>(null);

export const AttractionsServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const attractionsService = new AttractionService(
        new AttractionsAPI(axiosClient)
    );

    return (
        <AttractionServiceContext.Provider value={attractionsService}>
            {children}
        </AttractionServiceContext.Provider>
    );
};
