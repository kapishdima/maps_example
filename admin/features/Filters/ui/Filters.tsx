import React from "react";
import { FilterIcon, Heading, majorScale, Pane } from "evergreen-ui";

import { FiltersStoreProvider } from "../provider/FiltersStoreProvider";
import { Filter } from "../model/filters";
import { FiltersView } from "./FiltersView";
import { ApplyFiltersFunction } from "./FiltersApply";

type FiltersProps = {
    filters: Filter[];
    onApply: ApplyFiltersFunction;
};

export const Filters: React.FC<FiltersProps> = ({ filters, onApply }) => {
    return (
        <FiltersStoreProvider>
            <Heading size={300}>Filters</Heading>
            <Pane
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                flexWrap="wrap"
                marginBottom={majorScale(4)}
                marginTop={majorScale(2)}
            >
                <FilterIcon color="gray600" marginTop={majorScale(1)} />
                <FiltersView onApply={onApply} filters={filters} />
            </Pane>
        </FiltersStoreProvider>
    );
};
