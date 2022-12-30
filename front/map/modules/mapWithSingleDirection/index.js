import { orderBy } from "lodash";

import { renderDirection } from "../../core/directions";
import { renderLocations } from "../../renderers/renderMarkers";

import {
    createUrlWithFilters,
    toLocationWithMarker,
    exceptDuplicates,
    sendRequest,
    initFiltersElements,
} from "../../utils";

import { LocationCard } from "../../ui/location-card";

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

    if (!locations) {
        return;
    }

    locations.forEach((location, index) => {
        root.insertAdjacentElement(
            "beforeend",
            LocationCard(location, index, {
                withDeleteButton: false,
            })
        );
    });
};

export const createMapWithDirection = (mapEl, map) => {
    const wayId = mapEl.dataset.wayId;

    const routeType = mapEl.dataset.routeType;
    const isCustom = routeType === "custom";

    const locationsStore = LocationsStore(() => {
        renderLocations(locationsStore, map);
        renderDirection(locationsStore.getDirectionLocations(), map);

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

    const applyTypeFilters = () => {
        const filtersTypeEls = document.querySelectorAll(
            '[data-el="filter-type"]'
        );

        filtersTypeEls.forEach((el) => {
            el.addEventListener("input", (event) => {
                const filterName = event.target.getAttribute("name");
                const checked = event.target.checked;

                if (!filterName) {
                    return;
                }

                checked
                    ? filtersStore.setTypeFilter(filterName)
                    : filtersStore.removeTypeFilter(filterName);

                return;
            });
        });
    };

    applyTypeFilters();
};
