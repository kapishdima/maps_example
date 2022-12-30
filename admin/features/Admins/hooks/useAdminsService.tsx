import React from "react";
import { AdminServiceContext } from "../providers/AdminsServiceProvider";

export const useAdminsService = () => {
    return React.useContext(AdminServiceContext);
};
