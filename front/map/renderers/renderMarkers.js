import {
    renderDirectionMarker,
    renderInfoMarker,
    clearMarkers,
} from "../core/markers";

import { renderAndOpenLocationInfoWindow } from "../core/info-window";
import { renderAndOpenPointWindow } from "../ui/location-point-window";

export const renderInfoMarkers = (locationsStore, map, defaultActiveIndex) => {
    const locations = locationsStore.getInfoLocations();

    if (!locations) {
        return;
    }
    locations.forEach((location) => {
        const locationsWithActiveIndex = {
            ...location,
            isActive: location.id === defaultActiveIndex,
        };
        renderInfoMarker(locationsWithActiveIndex, map, {
            onMarkerClick: !window.isCreatingRoute
                ? renderAndOpenLocationInfoWindow
                : (marker, map, location) =>
                      renderAndOpenPointWindow(
                          location,
                          locationsStore,
                          marker,
                          map
                      ),
        });
    });
};

export const renderDirectionMarkers = (
    locationsStore,
    map,
    defaultActiveIndex
) => {
    const locations = locationsStore.getDirectionLocations();

    if (!locations || !locations.length) {
        return;
    }

    locations.forEach((location, index) => {
        const locationsWithActiveIndex = {
            ...location,
            isActive: location.id === defaultActiveIndex,
        };
        renderDirectionMarker(
            locationsWithActiveIndex,
            location.order || index,
            map,
            {
                onMarkerClick: !window.isCreatingRoute
                    ? renderAndOpenLocationInfoWindow
                    : (marker, map, location) =>
                          renderAndOpenPointWindow(
                              location,
                              locationsStore,
                              marker,
                              map
                          ),
            }
        );
    });
};

export const renderLocations = (locationsStore, map, defaultActiveIndex) => {
    clearMarkers();

    renderInfoMarkers(locationsStore, map, defaultActiveIndex);
    renderDirectionMarkers(locationsStore, map, defaultActiveIndex);
};
