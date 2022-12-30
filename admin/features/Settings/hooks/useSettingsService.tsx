import React from "react";
import { SettingsServiceContext } from "../providers/SettingsServiceProvider";

export const useSettingsService = () => {
    return React.useContext(SettingsServiceContext);
};
