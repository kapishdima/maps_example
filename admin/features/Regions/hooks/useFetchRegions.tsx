import { RegionDomainEntity } from "entities/region";
import { useList } from "shared/hooks";
import { useRegionsService } from "./useRegionsService";

export const useFetchRegions = () => {
    const regionsService = useRegionsService();

    const {
        pagination,
        data: regions,
        isFetching,
        refetch,
    } = useList<RegionDomainEntity[]>("regions", ({ page, size, filters }) =>
        regionsService.fetchRegions({
            page,
            size,
            filters,
        })
    );

    return {
        refetch,
        pagination,
        regions,
        isFetching,
    };
};
