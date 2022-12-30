import { GrapeDomainEntity } from "entities/grapes";
import { useList } from "shared/hooks";
import { useGrapesService } from "./useGrapesService";

export const useFetchGrapes = () => {
    const grapesService = useGrapesService();

    const {
        applyFilters,
        pagination,
        data: grapes,
        isFetching,
        refetch,
    } = useList<GrapeDomainEntity[]>("grapes", ({ page, size, filters }) =>
        grapesService.fetchGrapes({
            page,
            size,
            filters,
        })
    );

    return {
        applyFilters,
        pagination,
        grapes,
        isFetching,
        refetch,
    };
};
