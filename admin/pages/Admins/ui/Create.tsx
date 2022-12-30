import React from "react";

import { AdminsServiceProvider, AdminCreateContent } from "features/Admins";

export const AdminCreatePage: React.FC = () => {
    return (
        <AdminsServiceProvider>
            <AdminCreateContent />
        </AdminsServiceProvider>
    );
};
