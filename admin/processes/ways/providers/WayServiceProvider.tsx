import React from "react";

import { useAxiosClient } from "app/hooks";

import { WaysAPI } from "../api/ways.api";
import { WaysService } from "../service/ways.service";

export const WayServiceContext = React.createContext<WaysService>(null);

export const WayServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const waysService = new WaysService(new WaysAPI(axiosClient));

    return (
        <WayServiceContext.Provider value={waysService}>
            {children}
        </WayServiceContext.Provider>
    );
};
