import { IconButton, TrashIcon } from "evergreen-ui";
import React from "react";
import { useFiltersStore } from "../hooks/useFiltersStore";
import { Filter, SelectedFilter } from "../model/filters";
import { ApplyFiltersFunction } from "./FiltersApply";

type FilterDeleteProps = {
    filter: SelectedFilter;
    onApplyFilters: ApplyFiltersFunction;
};

export const FilterDelete: React.FC<FilterDeleteProps> = ({
    filter,
    onApplyFilters,
}) => {
    const filtersStore = useFiltersStore();

    const onDelete = () => {
        filtersStore.unselectFilter(filter);
        onApplyFilters(filtersStore.getFiltersForApi());
    };
    return (
        <IconButton
            type="button"
            tabIndex={-1}
            icon={TrashIcon}
            appearance="minimal"
            onClick={onDelete}
        />
    );
};
