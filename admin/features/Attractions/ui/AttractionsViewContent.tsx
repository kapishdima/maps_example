import React from "react";
import { useDeleteAttractions } from "../hooks/useDeleteAttractions";
import { useFetchAttractions } from "../hooks/useFetchAttractions";

import { AttractionsFilters } from "./AttractionsFilters";
import { AttractionsTable } from "./AttractionsTable";

export const AttractionsViewContent: React.FC = () => {
    const { attractions, isFetching, applyFilters, refetch } =
        useFetchAttractions();
    const deleteMutation = useDeleteAttractions(refetch);

    return (
        <>
            <AttractionsFilters applyFilters={applyFilters} />
            <AttractionsTable
                attractions={attractions}
                isFetching={isFetching}
                onDeleteAttraction={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
