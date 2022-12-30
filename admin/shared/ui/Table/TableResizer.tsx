import React from "react";

import { Select, Pane } from "evergreen-ui";
import { TableResizerProps } from "./types";
import { usePaginationStore } from "../Pagination/hooks/usePaginationStore";
import { observer } from "mobx-react";

export const TableResizer: React.FC<TableResizerProps> = observer(
    ({ pageOptions }) => {
        const paginationStore = usePaginationStore();

        return (
            <Pane width="100%">
                <Select
                    value={paginationStore?.getPageSize()}
                    onChange={(event) =>
                        paginationStore?.setPageSize(
                            parseInt(event.target.value)
                        )
                    }
                >
                    {pageOptions.map((pageOption) => (
                        <option key={`item_${pageOption}`} value={pageOption}>
                            {pageOption}
                        </option>
                    ))}
                </Select>
            </Pane>
        );
    }
);
