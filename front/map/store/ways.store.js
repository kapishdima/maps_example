import { differenceWith, isEqual } from "lodash";
import { createStore } from "./store";

export const WaysStore = (dispatch) => {
    const initialStore = {
        ways: [],
    };

    let store = createStore(initialStore, dispatch);

    const getWays = () => {
        return store.ways;
    };

    const setWays = (ways) => {
        if (!store.ways.length) {
            store.ways = ways;
            return;
        }

        if (ways.length > store.ways.length) {
            store.ways = ways;
            return;
        }

        if (shoudUpdate(ways)) {
            store.ways = ways;
            return;
        }
    };

    const shoudUpdate = (ways) => {
        return Boolean(differenceWith(store.ways, ways, isEqual).length);
    };

    return {
        setWays,
        getWays,
    };
};
