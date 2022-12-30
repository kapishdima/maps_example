import React from "react";
import { RegionsServiceContext } from "../providers/RegionsServiceProvider";

export const useRegionsService = () => {
    return React.useContext(RegionsServiceContext);
};
