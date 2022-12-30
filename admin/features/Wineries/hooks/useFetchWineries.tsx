import { WineryDomainEntity } from "entities/winery";
import { useList } from "shared/hooks";
import { useWineriesService } from "./useWineriesService";

export const useFetchWineries = () => {
    const wineriesService = useWineriesService();

    const {
        applyFilters,
        pagination,
        data: wineries,
        isFetching,
        refetch,
    } = useList<WineryDomainEntity[]>("wineries", ({ page, size, filters }) =>
        wineriesService.fetchWineries({
            page,
            size,
            filters,
        })
    );

    return {
        applyFilters,
        pagination,
        wineries,
        isFetching,
        refetch,
    };
};
