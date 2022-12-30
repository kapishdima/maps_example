import React, { useEffect, useRef, useState } from "react";

import { observer } from "mobx-react";
import GoogleMapReact from "google-map-react";

import { MapService, Center } from "processes/map";
import { useLocationsStore } from "processes/locations";

import { chunk, without } from "lodash";
import { createErrorNotification } from "shared/ui";

export const Map: React.FC = observer(() => {
    const [center, setCenter] = useState<Center>();
    const [mapService, setMapService] = useState<MapService>();

    const locationsStore = useLocationsStore();

    const locationsNotIncludedInRoute = locationsStore.selected.filter(
        (selectedLocation) => !selectedLocation.includedInRoute
    );
    const locationsIncludedInRoute = locationsStore.selected.filter(
        (selectedLocation) => selectedLocation.includedInRoute
    );

    const locationsChunks = chunk(locationsIncludedInRoute, 10);

    for (const locationNotIncludedInRoute of locationsNotIncludedInRoute) {
        mapService?.createMarker(locationNotIncludedInRoute.location);
    }

    for (const chunk of locationsChunks) {
        mapService?.createDirection(chunk.map(({ location }) => location));
    }

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627,
        },
        zoom: 5,
    };

    const handleApiLoaded = async (map, maps) => {
        const mapService = new MapService(map, {
            country: "ua",
        });

        setMapService(mapService);
        setCenter(await mapService.getCenter());
    };

    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: document.querySelector<HTMLMetaElement>(
                    'meta[name="map-key"]'
                )?.content,
            }}
            center={center || defaultProps.center}
            zoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        ></GoogleMapReact>
    );
});
