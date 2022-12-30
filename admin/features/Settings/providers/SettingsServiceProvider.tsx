import React from "react";
import { SettingsAPI, SettingsService } from "processes/settings";
import { useAxiosClient } from "app/hooks";

export const SettingsServiceContext =
    React.createContext<SettingsService>(null);

export const SettingsServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const settingsService = new SettingsService(new SettingsAPI(axiosClient));

    return (
        <SettingsServiceContext.Provider value={settingsService}>
            {children}
        </SettingsServiceContext.Provider>
    );
};
