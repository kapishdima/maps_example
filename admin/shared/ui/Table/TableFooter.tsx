import React from "react";

import { Pane } from "evergreen-ui";

import { PaginationSizeSelect } from "../Inputs/PaginationSizeSelect";
import { Pagination } from "../Pagination/Pagination";
import { usePaginationStore } from "../Pagination/hooks/usePaginationStore";
import { observer } from "mobx-react";

type TableFooterProps = {
    totalPages: number;
};

export const TableFooter: React.FC<TableFooterProps> = observer(
    ({ totalPages }) => {
        return (
            <Pane display="flex">
                <Pagination totalPages={totalPages} />
                <PaginationSizeSelect
                    options={["5", "10", "15", "20", "50", "100"]}
                />
            </Pane>
        );
    }
);
