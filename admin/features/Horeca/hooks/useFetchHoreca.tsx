import { HorecaDomainEntity } from "entities/horeca";
import { useList } from "shared/hooks";
import { useHorecaService } from "./useHorecaService";

export const useFetchHoreca = () => {
    const horecaService = useHorecaService();

    const {
        applyFilters,
        pagination,
        data: horeca,
        isFetching,
        refetch,
    } = useList<HorecaDomainEntity[]>("horeca", ({ page, size, filters }) =>
        horecaService.fetchHorecas({
            page,
            size,
            filters,
        })
    );

    return {
        applyFilters,
        pagination,
        horeca,
        isFetching,
        refetch,
    };
};
