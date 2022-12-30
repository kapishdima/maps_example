import React from "react";

import { Button, majorScale, Pane, SmallCrossIcon } from "evergreen-ui";
import { Select } from "shared/ui";
import { useFilterStatuses } from "features/Filters/hooks/useFilterStatuses";

const options = [
    { label: "Unprocessed", value: "unprocessed" },
    { label: "Draft", value: "draft" },
    { label: "Hidden", value: "hidden" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
];

type FilterStatusesProps = {
    name: string;
};

export const FilterStatuses: React.FC<FilterStatusesProps> = ({ name }) => {
    const { selectedStatuses, onDelete, onSelect } = useFilterStatuses(name);

    return (
        <Pane display="flex" alignItems="center">
            <Select
                onSelect={onSelect}
                title="By status"
                options={options}
                buttonText="Select status"
                buttonProps={{ borderRadius: "24px" }}
                closeOnSelect
            />
            <Pane
                display="flex"
                alignItems="center"
                columnGap={majorScale(1)}
                marginLeft={majorScale(1)}
            >
                {selectedStatuses.map((selectedStatus) => (
                    <Button
                        borderRadius="24px"
                        backgroundColor="#D6E0FF"
                        iconAfter={SmallCrossIcon}
                        onClick={() => onDelete(selectedStatus.value as string)}
                    >
                        {selectedStatus.label}
                    </Button>
                ))}
            </Pane>
        </Pane>
    );
};
