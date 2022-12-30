import React from "react";
import { useDeleteSeodatas } from "../hooks/useDeleteSeodatas";
import { useFetchSeodatas } from "../hooks/useFetchSeodatas";

import { SeodatasFilters } from "./SeodatasFilters";
import { SeodatasTable } from "./SeodatasTable";

export const SeodatasViewContent: React.FC = () => {
    const { seodatas, isFetching, applyFilters, refetch } = useFetchSeodatas();
    const deleteMutation = useDeleteSeodatas(refetch);

    return (
        <>
            <SeodatasFilters applyFilters={applyFilters} />
            <SeodatasTable
                seodatas={seodatas}
                isFetching={isFetching}
                onDeleteSeodata={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
