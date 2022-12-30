import React, { useContext } from "react";
import { FiltersStoreContext } from "../provider/FiltersStoreProvider";

export const useFiltersStore = () => {
    return useContext(FiltersStoreContext);
};
