import React from "react";
import { CommonDataContext } from "app/providers/with-common-data";

export const useCommonDataContext = () => {
    return React.useContext(CommonDataContext);
};
