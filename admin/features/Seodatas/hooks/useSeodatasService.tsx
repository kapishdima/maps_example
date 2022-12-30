import React from "react";
import { SeodataServiceContext } from "../providers/SeodatasServiceProvider";

export const useSeodatasService = () => {
    return React.useContext(SeodataServiceContext);
};
