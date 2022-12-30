import { orderBy, groupBy, chunk } from "lodash";

import { renderDirection } from "../../core/directions";
import { renderLocations } from "../../renderers/renderMarkers";

import {
    createUrlWithFilters,
    toLocationWithMarker,
    exceptDuplicates,
    sendRequest,
    initFiltersElements,
} from "../../utils";

import { LocationListWithCountryName } from "../../ui/location-card";

import { LocationsStore } from "../../store/locations.store";
import { FiltersStore } from "../../store/filters.store";

const fetchInfoLocations = async (wayId, filters) => {
    const url = `locations?way_id=${wayId}&type[]=winery&${createUrlWithFilters(
        filters
    )}`;
    const { data: locations } = await sendRequest(url);
    return exceptDuplicates(locations);
};

const fetchDirectionLocations = async (wayId) => {
    const url = `locations?way_id=${wayId}`;
    const { data: locations } = await sendRequest(url);
    return exceptDuplicates(locations);
};

const getInfoLocations = async (wayId, filters, locationsStore) => {
    const locations = await fetchInfoLocations(wayId, filters);

    const notIncludedInWayLocations = locations.filter(
        (location) => !location.include
    );

    locationsStore.setInfoLocations(notIncludedInWayLocations);
};

const getDirectionsLocations = async (wayId, locationsStore) => {
    if (!locationsStore.isDirectionLocationsEmpty()) {
        return;
    }

    if (!wayId) {
        return;
    }

    const locations = await fetchDirectionLocations(wayId);

    const includedInWayLocations = orderBy(
        locations.filter((location) => location.include),
        "order"
    );

    if (includedInWayLocations?.length) {
        locationsStore.setDirectionLocations(
            toLocationWithMarker(includedInWayLocations)
        );
    }
};

const render = (locations) => {
    const root = document.querySelector('[data-el="selected-locations-list"]');

    if (!root) {
        return;
    }

    root.innerHTML = "";

    const groupedLocations = groupBy(
        orderBy(locations, ["order"]),
        "country_name"
    );

    for (const [countryName, locations] of Object.entries(groupedLocations)) {
        Array.from(
            LocationListWithCountryName(countryName, locations).children
        ).forEach((child) => {
            root.insertAdjacentElement("beforeend", child);
        });
    }
};

export const createMapWithBlacksea = (mapEl, map) => {
    const wayId = mapEl.dataset.wayId;
    const routeType = mapEl.dataset.routeType;
    const isCustom = routeType === "custom";

    const locationsStore = LocationsStore(() => {
        renderLocations(locationsStore, map);

        for (const locations of chunk(
            locationsStore.getDirectionLocations(),
            10
        )) {
            renderDirection(locations, map);
        }

        render(locationsStore.getDirectionLocations());
    });

    const filtersStore = FiltersStore(async () => {
        getInfoLocations(wayId, filtersStore.getFilters(), locationsStore);
    });

    getInfoLocations(wayId, filtersStore.getFilters(), locationsStore);
    getDirectionsLocations(wayId, locationsStore);

    if (isCustom) {
        filtersStore.setFilter("routeType", "custom");
    }
    initFiltersElements(filtersStore);
};
