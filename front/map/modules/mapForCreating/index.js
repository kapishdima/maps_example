import { renderDirection, clearDirection } from "../../core/directions";
import { removeMarker } from "../../core/markers";
import { renderLocations } from "../../renderers/renderMarkers";

import {
    createUrlWithFilters,
    exceptDuplicates,
    sendRequest,
    initFiltersElements,
    getLocale,
} from "../../utils";

import { LocationCard } from "../../ui/location-card";
import { DownloadButton } from "../../ui/download-button";
import { ClearButton } from "../../ui/clear-button";

import { LocationsStore } from "../../store/locations.store";
import { FiltersStore } from "../../store/filters.store";
import { mapCenters } from "../../core/settings";

const setLocationActive = (locations, active) => {
    return locations.map((location) => ({ ...location, active }));
};

const highlightLocations = async (locations, locationsStore) => {
    const infoLocations = locationsStore.getInfoLocations();

    const locationsWithHightlighted = infoLocations.map((infoLocation) => {
        const shouldHighlight =
            locations.length !== infoLocations.length &&
            Boolean(
                locations.find((location) => location.id === infoLocation.id)
            );

        return {
            ...infoLocation,
            active: shouldHighlight,
        };
    });

    locationsStore.setInfoLocations(locationsWithHightlighted);
};

const getCenterCoords = () => {
    try {
        const address = location.pathname
            .replace(getLocale(), "")
            .split("/")
            .filter(Boolean)[1];

        if (!address) {
            return new google.maps.LatLng({ lat: 43.272265, lng: 34.292634 });
        }

        return mapCenters[address];
    } catch (error) {
        throw new Error(error);
    }
};

const fetchInfoLocations = async (countryId, filters) => {
    const url = `locations?country_id=${countryId}&type[]=winery&${createUrlWithFilters(
        filters
    )}`;
    const { data: locations } = await sendRequest(url);
    return exceptDuplicates(locations);
};

const getInfoLocations = async (countryId, filters, locationsStore) => {
    const locations = await fetchInfoLocations(countryId, filters);

    if (filters.tags && filters.tags.length > 0) {
        return highlightLocations(locations, locationsStore);
    }

    let notIncludedInWayLocations = locations.filter(
        (location) => !location.include
    );

    notIncludedInWayLocations = setLocationActive(
        notIncludedInWayLocations,
        Boolean(filters.tags && filters.tags.length)
    );

    locationsStore.setInfoLocations(notIncludedInWayLocations);
};

const render = (locationsStore) => {
    const root = document.querySelector('[data-el="selected-locations-list"]');
    const emptyEl = document.querySelector('[data-el="create-route-empty"]');
    const locations = locationsStore.getDirectionLocations();

    if (!root) {
        return;
    }

    if (locationsStore.isDirectionLocationsEmpty()) {
        emptyEl.classList.add("create-route__empty--visible");
        root.innerHTML = "";
        return;
    } else {
        emptyEl.classList.remove("create-route__empty--visible");
    }

    root.innerHTML = "";

    locations.forEach((location, index) => {
        root.insertAdjacentElement(
            "beforeend",
            LocationCard(location, index, {
                withDeleteButton: true,
                onDeleteLocation: () => {
                    locationsStore.deleteLocation(location);
                    removeMarker(location);
                },
            })
        );
    });

    if (!locationsStore.hasMinLocations()) {
        return clearDirection();
    }
};

const downloadWay = async (locations) => {
    if (!locations || !locations.length) {
        return;
    }

    const locationsWithOrder = locations.map((location, index) => ({
        id: location.id,
        order: index,
    }));

    const pdf = await sendRequest(
        "createPdf",
        "POST",
        JSON.stringify({ locations: locationsWithOrder })
    );

    return window.open(pdf.url, "_blank");
};

const clearWay = async (countryId, options, locationsStore) => {
    locationsStore.clear();

    // clearDirection();
    getInfoLocations(countryId, options, locationsStore);
};

export const createMapForCreating = async (mapEl, map) => {
    if (!window.isCreatingRoute) {
        return;
    }
    clearDirection();

    const countryId = mapEl.dataset.countryId;

    const locationsStore = LocationsStore(() => {
        renderLocations(locationsStore, map);
        renderDirection(locationsStore.getDirectionLocations(), map);
        render(locationsStore);
    });

    const filtersStore = FiltersStore(() => {
        getInfoLocations(countryId, filtersStore.getFilters(), locationsStore);
    });

    getInfoLocations(countryId, filtersStore.getFilters(), locationsStore);

    DownloadButton(async () =>
        downloadWay(locationsStore.getDirectionLocations())
    );
    ClearButton(() =>
        clearWay(countryId, filtersStore.getFilters(), locationsStore)
    );

    const center = getCenterCoords();
    map.setCenter(center.coords);
    map.setZoom(center.zoom);

    initFiltersElements(filtersStore);
};
