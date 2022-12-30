import { useState } from "react";
import { reaction } from "mobx";

import { QueryKey, useQuery } from "react-query";

import { GetListFunction, ListFilter } from "shared/api/types";
import { ListResponse } from "shared/api";
import { usePaginationStore } from "shared/ui";

export function useList<D>(
    name: QueryKey,
    getList: GetListFunction<ListResponse<D>>
) {
    const paginationStore = usePaginationStore();

    const [page, setPage] = useState(paginationStore.getCurrentPage());
    const [pageSize, setPageSize] = useState(paginationStore.getPageSize());
    const [filters, setFilters] = useState<ListFilter[]>([]);

    reaction(
        () => ({
            currentPage: paginationStore.getCurrentPage(),
            pageSize: paginationStore.getPageSize(),
        }),
        ({ currentPage, pageSize }) => {
            setPage(currentPage);
            setPageSize(pageSize);
        }
    );

    const queryKeys = [name, page, pageSize, filters];

    const query = useQuery(queryKeys, () =>
        getList({ page, size: pageSize, filters })
    );

    return {
        applyFilters: setFilters,
        pagination: {
            page,
            size: pageSize,
        },
        data: query.data,
        ...query,
    };
}
