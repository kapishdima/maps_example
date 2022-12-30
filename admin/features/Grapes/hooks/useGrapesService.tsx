import React from "react";
import { GrapeServiceContext } from "../providers/GrapesServiceProvider";

export const useGrapesService = () => {
    return React.useContext(GrapeServiceContext);
};
