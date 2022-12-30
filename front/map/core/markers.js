import { without } from "lodash";
import { toLatLng } from "../utils";
import { mapSettings } from "./settings";

let locationsWithMarkers = [];

export const clearMarkers = () => {
    if (!locationsWithMarkers.length) {
        return;
    }

    locationsWithMarkers.forEach((location) => {
        location.marker?.setMap(null);
    });

    locationsWithMarkers = [];
};

const isMarkerExit = (location) => {
    return Boolean(
        locationsWithMarkers.find((_location) => _location.id === location.id)
    );
};

export const removeMarker = (location) => {
    if (!locationsWithMarkers.length) {
        return;
    }

    const removedLocations = locationsWithMarkers.find(
        (_location) => _location.id === location.id
    );

    if (!removedLocations) {
        return;
    }

    removedLocations.marker?.setMap(null);
    locationsWithMarkers = without(locationsWithMarkers, removedLocations);
};

export const renderMarker = ({
    position,
    type,
    labelText,
    onClick,
    map,
    isActive,
}) => {
    if (!Object.keys(mapSettings.markerIcons).includes(type)) {
        return;
    }

    const markerIcon = mapSettings.markerIcons[type](
        !isActive ? "#FFFFFF" : mapSettings["activeMarkerColor"],
        mapSettings[!isActive ? "defaulMarkerFillColor" : "activeMarkerColor"],
        !isActive ? mapSettings["defaulMarkerFillColor"] : "#FFFFFF",
        labelText?.toString() || ""
    );

    const icon =
        type === "waypoint"
            ? markerIcon
            : mapSettings.markerIcons[type](
                  mapSettings[
                      !isActive ? "defaulMarkerFillColor" : "activeMarkerColor"
                  ]
              );

    const marker = new google.maps.Marker({
        position,
        icon,
        optimized: true,
        map,
    });

    if (isActive) {
        marker.setZIndex(1000);
    }

    marker.addListener("click", () => {
        if (onClick && typeof onClick === "function") {
            return onClick(marker, map);
        }
    });

    return marker;
};

export const renderInfoMarker = (location, map, { onMarkerClick }) => {
    if (isMarkerExit(location)) {
        removeMarker(location);
    }

    const position = toLatLng(location.lat, location.lng);
    const type =
        location.entity_type !== "horeca"
            ? location.entity_type
            : `${location.entity_type}.${location.entity.type}`;

    locationsWithMarkers.push({
        ...location,
        marker: renderMarker({
            position,
            type,
            onClick: (marker, map) => onMarkerClick(marker, map, location),
            map,
            isActive: location.isActive || location.active,
        }),
    });
};

export const renderDirectionMarker = (
    location,
    order,
    map,
    { onMarkerClick }
) => {
    if (isMarkerExit(location)) {
        removeMarker(location);
    }

    const position = toLatLng(location.lat, location.lng);
    const locationWithMarker = {
        ...location,
        marker: renderMarker({
            position,
            type: location.marker_type,
            labelText: order,
            onClick: (marker, map) => onMarkerClick(marker, map, location),
            map,
            isActive: location.isActive || location.active,
        }),
    };

    locationsWithMarkers.push(locationWithMarker);
};
