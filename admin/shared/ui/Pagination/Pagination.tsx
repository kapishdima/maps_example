import React from "react";
import { PaginationView } from "./PaginationView";
import { PaginationStoreProvider } from "./providers/PaginationStoreProvider";

type PaginationProps = {
    totalPages: number;
};

export const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
    return (
        <PaginationStoreProvider>
            <PaginationView totalPages={totalPages} />
        </PaginationStoreProvider>
    );
};
