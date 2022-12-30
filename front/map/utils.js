export const toLatLng = (lat, lng) => {
    return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
};

export const createUrlWithFilters = (filters) => {
    return Object.entries(filters).reduce((url, filter) => {
        const name = filter[0];
        const value = filter[1];

        if (Array.isArray(value)) {
            return (
                url +
                value.reduce((acc, current) => {
                    return acc + `${name}[]=${current}&`;
                }, "")
            );
        }

        return (url = url + `${filter.join("=")}&`);
    }, "");
};

export const getLocale = () => {
    const locale = document.documentElement.lang;
    return locale === "en" ? "" : `${locale}/`;
};

export const getBaseUrl = () => {
    return location.origin;
};

export const sendRequest = async (url, method = "GET", body = null) => {
    const response = await fetch(`${getBaseUrl()}/${getLocale()}${url}`, {
        method,
        body,
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
                .content,
        },
    });
    return response.json();
};

export const exceptDuplicates = (locations) => {
    return locations.filter((location, index, self) => {
        return (
            self.findIndex(
                (_location) =>
                    _location.lat === location.lat &&
                    _location.lng === location.lng
            ) === index
        );
    });
};

export const toLocationWithMarker = (locations) => {
    return locations.map((location, index, array) => {
        const markerType =
            index === 0
                ? "start_point"
                : index === array.length - 1
                ? "finish_point"
                : "waypoint";

        return {
            ...location,
            marker_type: markerType,
        };
    });
};

export const initFiltersElements = (filtersStore) => {
    const onTypeFilters = (event) => {
        const filterName = event.target.getAttribute("name");
        const checked = event.target.checked;

        if (!filterName) {
            return;
        }

        checked
            ? filtersStore.setTypeFilter(filterName)
            : filtersStore.removeTypeFilter(filterName);

        return;
    };

    const onTagsFilters = (event) => {
        const selected = event.target.dataset.selected;
        const tagName = event.target.dataset.tag;
        if (!tagName) {
            return;
        }

        selected
            ? filtersStore.setTagsFilter(tagName)
            : filtersStore.removeTagsFilter(tagName);
    };

    const onRegionsFilters = (event) => {
        const selected = event.target.dataset.selected;
        const regionName = event.target.dataset.region;

        if (!regionName) {
            return;
        }
        selected === "selected"
            ? filtersStore.setRegionsFilter(regionName)
            : filtersStore.removeRegionsFilter(regionName);
    };

    const filtersTypeEls = document.querySelectorAll('[data-el="filter-type"]');
    const filtersTagEls = document.querySelectorAll('[data-el="filter-tag"]');
    const filtersRegionEls = document.querySelectorAll(
        '[data-el="filter-region"]'
    );

    filtersTypeEls?.forEach((filtersButtonsEl) => {
        filtersButtonsEl.addEventListener("input", onTypeFilters);
    });

    filtersTagEls?.forEach((filterTagEl) => {
        filterTagEl.addEventListener("click", onTagsFilters);
    });

    filtersRegionEls?.forEach((filtersRegionEl) => {
        filtersRegionEl.addEventListener("click", onRegionsFilters);
    });
};

export const getTranslations = () => {
    const mapEl = document.querySelector(`[data-el="map"]`);
    const translations = mapEl.dataset.translations;

    return JSON.parse(translations);
};
