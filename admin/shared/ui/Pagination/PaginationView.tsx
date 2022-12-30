import React, { useEffect } from "react";

import { observer } from "mobx-react";
import { Pagination as PaginationUI } from "evergreen-ui";

import { usePaginationStore } from "./hooks/usePaginationStore";

type PaginationViewProps = {
    totalPages: number;
};

export const PaginationView: React.FC<PaginationViewProps> = observer(
    ({ totalPages }) => {
        const paginationStore = usePaginationStore();

        if (!paginationStore) {
            return null;
        }

        useEffect(() => {
            paginationStore.reset();
        }, []);

        return (
            <PaginationUI
                page={paginationStore.getCurrentPage()}
                totalPages={totalPages}
                onNextPage={() => paginationStore.nextPage(totalPages)}
                onPreviousPage={paginationStore.prevPage}
                onPageChange={paginationStore.gotoPage}
            />
        );
    }
);
