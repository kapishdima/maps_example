import React from "react";
import { Heading, majorScale, Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import { useFiltersStore } from "../hooks/useFiltersStore";
import { Filter } from "../model/filters";
import { FiltersSelect } from "./FiltersSelect";
import { FilterDelete } from "./FilterDelete";
import { ApplyFiltersFunction, FiltersApply } from "./FiltersApply";

type FiltersViewProps = {
    filters: Filter[];
    onApply: ApplyFiltersFunction;
};

export const FiltersView: React.FC<FiltersViewProps> = observer(
    ({ filters, onApply }) => {
        const filtersStore = useFiltersStore();
        const selectedFilters = filtersStore.getSelectedFilters();

        if (selectedFilters.length === 0) {
            return (
                <Pane paddingLeft={majorScale(1)}>
                    <FiltersSelect filters={filters} title="Wineries filters" />
                </Pane>
            );
        }

        return (
            <Pane
                display="flex"
                flexDirection="column"
                rowGap={majorScale(1)}
                paddingLeft={majorScale(3)}
            >
                {selectedFilters.map((filter, index) => (
                    <Pane display="flex" alignItems="center">
                        <Heading size={100} marginRight={majorScale(1)}>
                            {filter.name}
                        </Heading>
                        {filter.Component}
                        <FilterDelete
                            onApplyFilters={onApply}
                            filter={filter}
                        />
                        {index === selectedFilters.length - 1 ? (
                            <>
                                <FiltersSelect
                                    filters={filters}
                                    title="Wineries filters"
                                />
                                <FiltersApply onClick={onApply} />
                            </>
                        ) : null}
                    </Pane>
                ))}
            </Pane>
        );
    }
);
