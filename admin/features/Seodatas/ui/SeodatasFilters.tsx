import React from "react";

import {
    Filter,
    FilterInput,
    Filters,
    FilterStatuses,
    ApplyFiltersFunction,
} from "features/Filters";

const filtersItems: Filter[] = [
    {
        name: "By name",
        Component: <FilterInput placeholder="Enter name..." name="name" />,
    },
    {
        name: "By status",
        Component: <FilterStatuses name="status" />,
    },
];

type SeodatasFiltersProps = {
    applyFilters: ApplyFiltersFunction;
};

export const SeodatasFilters: React.FC<SeodatasFiltersProps> = ({
    applyFilters,
}) => {
    const onApplyFilters = (values) => {
        applyFilters(values);
    };

    return <Filters filters={filtersItems} onApply={onApplyFilters} />;
};
