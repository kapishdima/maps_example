import { WayDomainEntity } from "entities/ways";
import { useWaysService } from "processes/ways";
import { useList } from "shared/hooks";

export const useFetchWays = () => {
    const waysService = useWaysService();

    const {
        applyFilters,
        pagination,
        data: ways,
        isFetching,
        refetch,
    } = useList<WayDomainEntity[]>("ways", ({ page, size, filters }) =>
        waysService.getWays({ page, size, filters })
    );

    return {
        applyFilters,
        pagination,
        ways,
        isFetching,
        refetch,
    };
};
