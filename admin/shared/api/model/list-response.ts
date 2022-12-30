export type ListMeta = {
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
};

export type ListResponse<D> = {
    data: D;
    meta: ListMeta;
};
