import { AdminDomainEntity } from "entities/admins";
import { useList } from "shared/hooks";
import { useAdminsService } from "./useAdminsService";

export const useFetchAdmins = () => {
    const adminsService = useAdminsService();

    const {
        applyFilters,
        pagination,
        data: admins,
        isFetching,
        refetch,
    } = useList<AdminDomainEntity[]>("admins", ({ page, size, filters }) =>
        adminsService.fetchAdmins({
            page,
            size,
            filters,
        })
    );

    return {
        applyFilters,
        pagination,
        admins,
        isFetching,
        refetch,
    };
};
