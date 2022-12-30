import React from "react";
import { useDeleteHoreca } from "../hooks/useDeleteHoreca";
import { useFetchHoreca } from "../hooks/useFetchHoreca";

import { HorecaFilters } from "./HorecaFilters";
import { HorecaTable } from "./HorecaTable";

export const HorecaViewContent: React.FC = () => {
    const { horeca, isFetching, applyFilters, refetch } = useFetchHoreca();
    const deleteMutation = useDeleteHoreca(refetch);

    return (
        <>
            <HorecaFilters applyFilters={applyFilters} />
            <HorecaTable
                horeca={horeca}
                isFetching={isFetching}
                onDeleteHoreca={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
