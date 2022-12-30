import React from "react";
import { AttractionServiceContext } from "../providers/AttractionsServiceProvider";

export const useAttractionsService = () => {
    return React.useContext(AttractionServiceContext);
};
