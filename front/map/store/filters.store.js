import { createStore } from "./store";

export const FiltersStore = (dispatch) => {
    const filters = {};

    let store = createStore(filters, dispatch);

    const getFilter = (name) => {
        return store[name];
    };

    const getFilters = () => {
        return store;
    };

    const setFilter = (name, filter) => {
        if (store[name] === filter) {
            return;
        }
        store[name] = filter;
    };

    const setTagsFilter = (tags) => {
        if (store.tags) {
            store.tags = [...store.tags, tags];
        } else {
            store.tags = [tags];
        }
    };

    const removeRegionsFilter = (region) => {
        if (!store.region_id) {
            return;
        }

        store.region_id = store.region_id.filter(
            (_region) => _region !== region
        );
    };

    const setRegionsFilter = (regions) => {
        if (store.region_id) {
            store.region_id = [...store.region_id, regions];
        } else {
            store.region_id = [regions];
        }
    };

    const removeTagsFilter = (tag) => {
        if (!store.tags) {
            return;
        }

        store.tags = store.tags.filter((_tag) => _tag !== tag);
    };

    const setTypeFilter = (type) => {
        if (store.type) {
            store.type = [...store.type, type];
        } else {
            store.type = [type];
        }
    };

    const removeTypeFilter = (type) => {
        if (!store.type) {
            return;
        }

        store.type = store.type.filter((_type) => _type !== type);
    };

    return {
        getFilters,
        getFilter,
        setFilter,
        setTypeFilter,
        removeTypeFilter,
        setTagsFilter,
        removeTagsFilter,
        setRegionsFilter,
        removeRegionsFilter,
    };
};
