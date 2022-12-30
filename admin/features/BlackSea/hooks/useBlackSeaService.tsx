import React from "react";
import { BlackSeaServiceContext } from "../providers/BlackSeaServiceProvider";

export const useBlackSeaService = () => {
    return React.useContext(BlackSeaServiceContext);
};
