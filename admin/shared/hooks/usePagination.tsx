import React, { useState } from "react";

export type PaginationT = {
    page: number;
    size: number;
    onPage: (page: number) => void;
    onPrev: () => void;
    onNext: () => void;
    onSize: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const usePagination = (): PaginationT => {
    const [{ page, size }, setPagination] = useState({ page: 1, size: 10 });

    const onNext = () => {
        setPagination((pagination) => ({
            ...pagination,
            page: pagination.page + 1,
        }));
    };

    const onPrev = () => {
        setPagination((pagination) => ({
            ...pagination,
            page: pagination.page - 1,
        }));
    };

    const onPage = (page: number) => {
        setPagination((pagination) => ({
            ...pagination,
            page,
        }));
    };

    const onSize = (event) => {
        const { value } = event.target;

        setPagination((pagination) => ({
            ...pagination,
            size: value,
        }));
    };

    return {
        page,
        size,
        onPrev,
        onNext,
        onPage,
        onSize,
    };
};
