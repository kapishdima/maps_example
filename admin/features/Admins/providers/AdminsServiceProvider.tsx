import React from "react";
import { AdminsAPI, AdminService } from "processes/admins";
import { useAxiosClient } from "app/hooks";

export const AdminServiceContext = React.createContext<AdminService>(null);

export const AdminsServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const adminsService = new AdminService(new AdminsAPI(axiosClient));

    return (
        <AdminServiceContext.Provider value={adminsService}>
            {children}
        </AdminServiceContext.Provider>
    );
};
