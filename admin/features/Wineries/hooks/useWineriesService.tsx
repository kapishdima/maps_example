import React from "react";
import { WineryServiceContext } from "../providers/WineriesServiceProvider";

export const useWineriesService = () => {
    return React.useContext(WineryServiceContext);
};
