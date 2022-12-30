import { SeodataDomainEntity } from "entities/seodatas";
import { useList } from "shared/hooks";
import { useSeodatasService } from "./useSeodatasService";

export const useFetchSeodatas = () => {
    const seodatasService = useSeodatasService();

    const {
        applyFilters,
        pagination,
        data: seodatas,
        isFetching,
        refetch,
    } = useList<SeodataDomainEntity[]>("seodatas", ({ page, size, filters }) =>
        seodatasService.fetchSeodatas({
            page,
            size,
            filters,
        })
    );

    return {
        applyFilters,
        refetch,
        pagination,
        seodatas,
        isFetching,
    };
};
