import React from "react";

import { AdminsServiceProvider, AdminEditContent } from "features/Admins";

export const AdminEditPage: React.FC = () => {
    return (
        <AdminsServiceProvider>
            <AdminEditContent />
        </AdminsServiceProvider>
    );
};
