import React from "react";
import { Pane, Select } from "evergreen-ui";
import { usePaginationStore } from "shared/ui";

type PaginationSizeSelectProps = {
    options: string[];
};

export const PaginationSizeSelect: React.FC<PaginationSizeSelectProps> = ({
    options,
}) => {
    const paginationStore = usePaginationStore();

    return (
        <Pane width="100%">
            <Select
                value={paginationStore?.getPageSize()}
                onChange={(event) =>
                    paginationStore?.setPageSize(parseInt(event.target.value))
                }
            >
                {options.map((option) => (
                    <option key={`item_${option}`} value={option}>
                        {option}
                    </option>
                ))}
            </Select>
        </Pane>
    );
};
