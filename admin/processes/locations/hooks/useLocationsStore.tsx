import React from "react";
import { LocationsStoreContext } from "../providers/LocationsStoreProvider";

export const useLocationsStore = () => {
    const context = React.useContext(LocationsStoreContext);

    if (!context) {
        throw new Error();
    }
    return context;
};
