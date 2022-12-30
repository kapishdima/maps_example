type ListPagination = {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
};

export type ListResponse<D> = {
    data: D;
    pagination: ListPagination;
};
