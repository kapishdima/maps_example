import React from "react";
import { AxiosClientContext } from "../providers/with-axios";

export const useAxiosClient = () => {
    return React.useContext(AxiosClientContext);
};
