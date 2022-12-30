import { Loader } from "@googlemaps/js-api-loader";

import { mapSettings } from "./settings";

const loadGoogleApi = (apiKey) => {
    const loader = new Loader({
        apiKey,
        libraries: ["visualization"],
    });

    return loader.load();
};

const getApiKey = () => document.querySelector('meta[name="map-key"]')?.content;

export const renderMap = (mapEl, center) => {
    const mapOptions = {
        center: center || {
            lat: 0,
            lng: 0,
        },
        maxZoom: mapSettings.maxZoom,
        zoom: mapSettings.zoom,
        styles: mapSettings.styles,
        mapTypeControl: mapSettings.mapTypeControl,
        streetViewControl: mapSettings.streetViewControl,
        fullscreenControl: mapSettings.fullscreenControl,
    };

    const map = new google.maps.Map(mapEl, mapOptions);

    google.maps.event.addListenerOnce(map, "idle", function () {
        window.MAP_FULLY_LOADED = true;
    });

    return map;
};

export const createMap = ({ target, center, onLoaded }) => {
    try {
        const mapEl = target || document.querySelector('[data-element="map"]');
        const apiKey = getApiKey();

        loadGoogleApi(apiKey).then(() => {
            const map = renderMap(mapEl, center);
            if (onLoaded && typeof onLoaded === "function") {
                onLoaded(map);
            }
        });
    } catch (error) {
        console.error(error);
    }
};
