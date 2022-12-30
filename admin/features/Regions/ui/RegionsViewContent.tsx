import React from "react";
import { useDeleteRegion } from "../hooks/useDeleteRegion";
import { useFetchRegions } from "../hooks/useFetchRegions";

import { RegionsTable } from "./RegionsTable";

export const RegionsViewContent: React.FC = () => {
    const { regions, isFetching, refetch } = useFetchRegions();
    const deleteMutation = useDeleteRegion(refetch);

    return (
        <>
            <RegionsTable
                regions={regions}
                isFetching={isFetching}
                onDeleteRegions={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
