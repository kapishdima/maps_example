import { createStore } from "./store";

export const LocationsStore = (dispatch) => {
    const defaultLocations = {
        infoLocations: null,
        directionLocations: null,
    };

    let store = createStore(defaultLocations, dispatch);

    const getLocations = () => {
        return store;
    };

    const setInfoLocations = (locations) => {
        store.infoLocations = locations;
    };

    const setDirectionLocations = (locations) => {
        store.directionLocations = locations;
    };

    const getInfoLocations = () => {
        return store.infoLocations;
    };

    const getDirectionLocations = () => {
        return store.directionLocations;
    };

    const setDirectionLocation = (location) => {
        if (!store.directionLocations) {
            store.directionLocations = [location];
            return;
        }

        if (isDirectionLocationExist(location)) {
            return;
        }
        store.directionLocations = [...store.directionLocations, location];
    };

    const isDirectionLocationsEmpty = () => {
        if (!store.directionLocations) {
            return true;
        }
        return store.directionLocations.length <= 0;
    };

    const isDirectionLocationExist = (location) => {
        return Boolean(
            store.directionLocations.find(
                (_location) => _location.id === location.id
            )
        );
    };

    const hasMinLocations = () => {
        if (!store.directionLocations) {
            return false;
        }

        return store.directionLocations.length >= 2;
    };

    const hasFinishLocation = () => {
        const finishLocation = store.directionLocations?.find(
            (selectedLocation) =>
                selectedLocation.marker_type === "finish_point"
        );

        return Boolean(finishLocation);
    };

    const isInfoLocationExist = (location) => {
        return store.infoLocations.find((l) => l.id === location.id);
    };

    const getLocationIndex = (location) => {
        return store.directionLocations.findIndex(
            (selecteLocation) => selecteLocation.id === location.id
        );
    };

    const deleteLocation = (location) => {
        store.directionLocations = store.directionLocations.filter(
            (_location) => _location.id !== location.id
        );
    };

    const clear = () => {
        store.infoLocations = null;
        store.directionLocations = null;
    };

    const clearDirectionLocations = () => {
        store.directionLocations = null;
    };

    return {
        getLocations,
        getDirectionLocations,
        getInfoLocations,
        setDirectionLocation,
        setInfoLocations,
        setDirectionLocations,
        getLocationIndex,
        deleteLocation,
        hasMinLocations,
        hasFinishLocation,
        isDirectionLocationsEmpty,
        isDirectionLocationExist,
        clear,
        clearDirectionLocations,
        isInfoLocationExist,
    };
};
