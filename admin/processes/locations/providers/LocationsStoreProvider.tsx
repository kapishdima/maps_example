import React, { useEffect } from "react";
import { LocationViewEntity } from "entities/location";

import { LocationsStore } from "../store/locations";
import { orderBy } from "lodash";

const locationStore = new LocationsStore();
export const LocationsStoreContext =
    React.createContext<LocationsStore>(locationStore);

type LocationsStoreProviderProps = {
    defaultLocations?: LocationViewEntity[];
};

export const LocationsStoreProvider: React.FC<LocationsStoreProviderProps> = ({
    children,
    defaultLocations,
}) => {
    useEffect(() => {
        if (defaultLocations) {
            locationStore.selectMany(orderBy(defaultLocations, "order"));
        }
    }, []);

    return (
        <LocationsStoreContext.Provider value={locationStore}>
            {children}
        </LocationsStoreContext.Provider>
    );
};
