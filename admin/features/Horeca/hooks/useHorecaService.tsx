import React from "react";
import { HorecaServiceContext } from "../providers/HorecaServiceProvider";

export const useHorecaService = () => {
    return React.useContext(HorecaServiceContext);
};
