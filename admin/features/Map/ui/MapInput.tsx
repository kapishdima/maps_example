import React from "react";

import { FormField, Pane } from "evergreen-ui";

import { LocationsStoreProvider } from "processes/locations";
import { LocationInput } from "features/Locations/ui";
import { Input } from "shared/ui";

import { Map } from "./Map";
import { MapInputManager } from "../provider/MapInputManager";

type MapInputProps = {
    name?: string;
};

export const MapInput: React.FC<MapInputProps> = ({ name }) => {
    const inputName = name || "locations";

    return (
        <Input name={inputName}>
            {({ field }) => (
                <LocationsStoreProvider defaultLocations={field.value}>
                    <MapInputManager>
                        <Pane
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="space-between"
                        >
                            <Pane minWidth="50%" maxWidth="50%" height="60vh">
                                <FormField label="Map Overview" height="60vh">
                                    <Map />
                                </FormField>
                            </Pane>
                            <LocationInput />
                        </Pane>
                    </MapInputManager>
                </LocationsStoreProvider>
            )}
        </Input>
    );
};
