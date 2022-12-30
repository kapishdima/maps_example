import { createMap } from "./core/index";
import { createMapWithDirection } from "./modules/mapWithSingleDirection";
import { createMapWithWays } from "./modules/mapWithWays";
import { createMapWithBlacksea } from "./modules/mapWithBlackSea";
import { createMapWithWinery } from "./modules/mapWithWineries";
import { createMapForPdf } from "./modules/mapForPdf";

window.isCreatingRoute = false;

const mapsRenderer = {
    map_with_ways: createMapWithWays,
    map_with_direction: createMapWithDirection,
    map_with_blacksea: createMapWithBlacksea,
    map_with_winery: createMapWithWinery,
    map_for_pdf: createMapForPdf,
};

const init = async () => {
    const mapEl = document.querySelector('[data-el="map"]');
    const mapType = mapEl?.dataset.mapType;

    if (!mapEl || !mapType) {
        return;
    }

    const onGoogleMapLoaded = async (map) => {
        mapsRenderer[mapType](mapEl, map);
    };

    createMap({
        target: mapEl,
        onLoaded: onGoogleMapLoaded,
    });
};

export default init;
