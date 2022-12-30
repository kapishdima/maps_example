import React from "react";
import { WayServiceContext } from "../providers/WayServiceProvider";

export const useWaysService = () => {
    return React.useContext(WayServiceContext);
};
