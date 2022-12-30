import React from "react";
import { useDeleteGrapes } from "../hooks/useDeleteGrapes";
import { useFetchGrapes } from "../hooks/useFetchGrapes";

import { GrapesFilters } from "./GrapesFilters";
import { GrapesTable } from "./GrapesTable";

export const GrapesViewContent: React.FC = () => {
    const { grapes, isFetching, applyFilters, refetch } = useFetchGrapes();
    const deleteMutation = useDeleteGrapes(refetch);

    return (
        <>
            <GrapesFilters applyFilters={applyFilters} />
            <GrapesTable
                grapes={grapes}
                isFetching={isFetching}
                onDeleteGrape={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
