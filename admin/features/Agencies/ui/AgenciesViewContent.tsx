import React from "react";
import { useDeleteAgencies } from "../hooks/useDeleteAgency";
import { useFetchAgencies } from "../hooks/useFetchAgency";

import { AgenciesFilters } from "./AgencyFilters";
import { AgenciesTable } from "./AgencyTable";

export const AgenciesViewContent: React.FC = () => {
    const { agencies, isFetching, applyFilters, refetch } = useFetchAgencies();
    const deleteMutation = useDeleteAgencies(refetch);

    return (
        <>
            <AgenciesFilters applyFilters={applyFilters} />
            <AgenciesTable
                agencies={agencies}
                isFetching={isFetching}
                onDeleteAgency={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
