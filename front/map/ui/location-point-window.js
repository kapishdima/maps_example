import { LocationInfoWindow } from "./location-info-window";

import { createInfoWindow, openInfoWindow } from "../core/info-window";

let prevInfoWindowNode = null;

const closeInfoWindow = (prevInfoWindow) => {
    if (!prevInfoWindow) {
        return;
    }

    prevInfoWindow.close();
    prevInfoWindowNode = null;
};

export const renderAndOpenPointWindow = (
    location,
    locationsStore,
    marker,
    map
) => {
    const isLocationsEmpty = locationsStore.isDirectionLocationsEmpty();

    const addPoint = (markerType) => {
        locationsStore.setDirectionLocation({
            ...location,
            marker_type: markerType,
        });
    };

    const onStartDirection = () => {
        if (locationsStore.hasFinishLocation()) {
            return;
        }

        addPoint("start_point");
    };
    const onAddWaypoint = () => {
        if (locationsStore.hasFinishLocation()) {
            return;
        }

        addPoint("waypoint");
    };
    const onFinishDirection = () => {
        if (locationsStore.hasFinishLocation()) {
            return;
        }

        addPoint("finish_point");
    };

    const infoWindowNode = LocationInfoWindow(location, isLocationsEmpty, {
        onStartDirection,
        onAddWaypoint,
        onFinishDirection,
    });

    const infoWindow = createInfoWindow(infoWindowNode);

    openInfoWindow(infoWindow, marker, map, closeInfoWindow);

    prevInfoWindowNode = infoWindowNode;
};
