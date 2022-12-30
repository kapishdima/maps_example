import React from "react";
import { AgencyServiceContext } from "../providers/AgenciesServiceProvider";

export const useAgenciesService = () => {
    return React.useContext(AgencyServiceContext);
};
