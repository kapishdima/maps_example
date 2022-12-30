import React from "react";
import { ArrayInputContext } from "../ArrayInputProvider";

export const useArrayInput = () => {
    return React.useContext(ArrayInputContext);
};
