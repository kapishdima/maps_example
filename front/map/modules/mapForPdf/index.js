import { orderBy } from "lodash";

import { renderDirection } from "../../core/directions";
import { renderLocations } from "../../renderers/renderMarkers";

import {
    toLocationWithMarker,
    exceptDuplicates,
    sendRequest,
} from "../../utils";

import { LocationsStore } from "../../store/locations.store";

const fetchLocations = async (wayId, routeType) => {
    const url = `locations?way_id=${wayId}&routeType=${routeType}`;
    const { data: locations } = await sendRequest(url);
    return exceptDuplicates(locations);
};

const getLocations = async (wayId, routeType, locationsStore) => {
    const locations = await fetchLocations(wayId, routeType);

    const notIncludedInWayLocations = locations.filter(
        (location) => !location.include
    );

    const includedInWayLocations = orderBy(
        locations.filter((location) => location.include),
        "order"
    );

    locationsStore.setInfoLocations(notIncludedInWayLocations);

    if (includedInWayLocations?.length) {
        locationsStore.setDirectionLocations(
            toLocationWithMarker(includedInWayLocations)
        );
    }
};

export const createMapForPdf = (mapEl, map) => {
    const wayId = mapEl.dataset.wayId;
    const routeType = mapEl.dataset.routeType;
    window.MAP_CREATION_STARTED = true;
    const locationsStore = LocationsStore(async () => {
        renderLocations(locationsStore, map);
        const result = await renderDirection(
            locationsStore.getDirectionLocations(),
            map
        );
    });

    getLocations(wayId, routeType, locationsStore);
};
