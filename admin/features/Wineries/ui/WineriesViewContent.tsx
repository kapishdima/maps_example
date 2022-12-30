import React from "react";
import { useDeleteWineries } from "../hooks/useDeleteWineries";
import { useFetchWineries } from "../hooks/useFetchWineries";

import { WineriesFilters } from "./WineriesFilters";
import { WineriesTable } from "./WineriesTable";

export const WineriesViewContent: React.FC = () => {
    const { wineries, isFetching, applyFilters, refetch } = useFetchWineries();
    const deleteMutation = useDeleteWineries(refetch);

    return (
        <>
            <WineriesFilters applyFilters={applyFilters} />
            <WineriesTable
                wineries={wineries}
                isFetching={isFetching}
                onDeleteWinery={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
