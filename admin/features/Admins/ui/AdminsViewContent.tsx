import React from "react";
import { useDeleteAdmins } from "../hooks/useDeleteAdmins";
import { useFetchAdmins } from "../hooks/useFetchAdmins";

import { AdminsFilters } from "./AdminsFilters";
import { AdminsTable } from "./AdminsTable";

export const AdminsViewContent: React.FC = () => {
    const { admins, isFetching, applyFilters, refetch } = useFetchAdmins();
    const deleteMutation = useDeleteAdmins(refetch);

    return (
        <>
            <AdminsFilters applyFilters={applyFilters} />
            <AdminsTable
                admins={admins}
                isFetching={isFetching}
                onDeleteAdmin={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
