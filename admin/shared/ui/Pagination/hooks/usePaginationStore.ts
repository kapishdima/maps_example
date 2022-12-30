import React from "react";
import { PaginationStoreContext } from "../providers/PaginationStoreProvider";

export const usePaginationStore = () => {
    return React.useContext(PaginationStoreContext);
};
