import { orderBy } from "lodash";

import { clearDirection, renderDirection } from "../../core/directions";
import { renderLocations } from "../../renderers/renderMarkers";

import { CreateButton } from "../../ui/create-button";
import { WaysList } from "../../ui/ways-list";

import {
    createUrlWithFilters,
    toLocationWithMarker,
    exceptDuplicates,
    sendRequest,
    initFiltersElements,
} from "../../utils";

import { LocationsStore } from "../../store/locations.store";
import { WaysStore } from "../../store/ways.store";
import { FiltersStore } from "../../store/filters.store";
import { createMapForCreating } from "../mapForCreating";

let isCreating = false;

const fetchInfoLocations = async (filters) => {
    const url = `locations?type[]=winery&${createUrlWithFilters(filters)}`;
    const { data: locations } = await sendRequest(url);
    return exceptDuplicates(locations);
};

const fetchDirectionLocations = async (wayId) => {
    const url = `locations?way_id=${wayId}`;
    const { data: locations } = await sendRequest(url);
    return exceptDuplicates(locations);
};

const fetchWays = async (countryId, wineryId, filters) => {
    const url = `ways?country_id=${countryId}&winery_id=${wineryId}&${createUrlWithFilters(
        filters
    )}`;
    const { data: ways } = await sendRequest(url);

    return ways;
};

const getInfoLocations = async (filters, locationsStore) => {
    const locations = await fetchInfoLocations(filters);

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

const getWays = async (countryId, wineryId, options, waysStore) => {
    const ways = await fetchWays(countryId, wineryId, options);
    waysStore.setWays(ways);
};

const renderWays = (ways, filtersStore, locationsStore) => {
    const onSelectWay = (way) => {
        locationsStore.clear();
        filtersStore.setFilter("way_id", way.id);
    };

    WaysList(ways, ways.length ? 0 : null, onSelectWay);
};

export const createMapWithWinery = (mapEl, map) => {
    const countryId = mapEl.dataset.countryId;
    const wineryId = mapEl.dataset.wineryId;

    const locationsStore = LocationsStore(() => {
        if (window.isCreatingRoute) {
            return;
        }

        renderLocations(locationsStore, map, parseInt(wineryId));
        renderDirection(locationsStore.getDirectionLocations(), map).catch(
            () => {
                locationsStore.clear();
            }
        );
    });
    const waysStore = WaysStore(() => {
        if (window.isCreatingRoute) {
            return;
        }

        const ways = waysStore.getWays();

        if (ways.length && ways[0].id) {
            filtersStore.setFilter("way_id", ways[0].id);
        }

        renderWays(ways, filtersStore, locationsStore);
    });
    const filtersStore = FiltersStore(() => {
        if (window.isCreatingRoute) {
            return;
        }

        getInfoLocations(filtersStore.getFilters(), locationsStore);
        if (locationsStore.isDirectionLocationsEmpty()) {
            getDirectionsLocations(
                filtersStore.getFilters()["way_id"],
                locationsStore
            );
        }
        getWays(countryId, wineryId, filtersStore.getFilters(), waysStore);
    });

    getWays(countryId, wineryId, filtersStore.getFilters(), waysStore);

    CreateButton(async () => {
        window.isCreatingRoute = true;
        createMapForCreating(mapEl, map);
    });

    initFiltersElements(filtersStore);
};
