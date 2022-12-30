import { AttractionDomainEntity } from "entities/attractions";
import { useList } from "shared/hooks";
import { useAttractionsService } from "./useAttractionsService";

export const useFetchAttractions = () => {
    const attractionsService = useAttractionsService();

    const {
        applyFilters,
        pagination,
        data: attractions,
        isFetching,
        refetch,
    } = useList<AttractionDomainEntity[]>(
        "attractions",
        ({ page, size, filters }) =>
            attractionsService.fetchAttractions({
                page,
                size,
                filters,
            })
    );

    return {
        applyFilters,
        pagination,
        attractions,
        isFetching,
        refetch,
    };
};
