import React from "react";

import { AutocompleteInput } from "shared/ui";
import { useLocationsStore, useLocationsService } from "processes/locations";
import { LocationViewEntity } from "entities/location";
import { Badge, majorScale } from "evergreen-ui";

export const LocationSearch: React.FC = () => {
    const locationsService = useLocationsService();
    const locationsStore = useLocationsStore();

    const onLocationSelect = (location: LocationViewEntity) => {
        locationsStore.selectOne({ ...location, include: true });
    };

    return (
        <AutocompleteInput
            style={{
                width: "90%",
            }}
            label="Locations"
            name="locations"
            placeholder="Search location..."
            getItems={async (value) => {
                if (!value) {
                    return null;
                }
                const locations = await locationsService.searchLocation(value);
                return locations.map((location) => {
                    return {
                        label: location.name,
                        value: location,
                        extra: (
                            <Badge color="green" marginLeft={majorScale(1)}>
                                {location.type}
                            </Badge>
                        ),
                    };
                });
            }}
            onSelect={onLocationSelect}
            cleanAfterSelect
        />
    );
};
