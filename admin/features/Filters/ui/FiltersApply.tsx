import React from "react";

import { Button } from "evergreen-ui";
import { observer } from "mobx-react-lite";

import { useFiltersStore } from "../hooks/useFiltersStore";
import { ListFilter } from "shared/api/types";

export type ApplyFiltersFunction = (values: ListFilter[]) => void;

type FiltersApplyProps = {
    onClick: ApplyFiltersFunction;
};

export const FiltersApply: React.FC<FiltersApplyProps> = observer(
    ({ onClick }) => {
        const filtersStore = useFiltersStore();

        const onApply = () => {
            const selectedFilters = filtersStore.getSelectedFilters();

            if (!selectedFilters) {
                return;
            }

            const filtersForFetch = selectedFilters.map((filter) => ({
                [filter.Component.props.name]: filter.value,
            }));

            onClick(filtersForFetch);
        };

        return (
            <Button onClick={onApply} borderRadius="30px" appearance="minimal">
                Apply Filters
            </Button>
        );
    }
);
