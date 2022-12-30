import { AgencyDomainEntity } from "entities/agencies";
import { useList } from "shared/hooks";
import { useAgenciesService } from "./useAgenciesService";

export const useFetchAgencies = () => {
    const agenciesService = useAgenciesService();

    const {
        applyFilters,
        pagination,
        data: agencies,
        isFetching,
        refetch,
    } = useList<AgencyDomainEntity[]>("agencies", ({ page, size, filters }) =>
        agenciesService.fetchAgencies({
            page,
            size,
            filters,
        })
    );

    return {
        applyFilters,
        pagination,
        agencies,
        isFetching,
        refetch,
    };
};
