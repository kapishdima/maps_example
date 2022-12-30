import { Button, PlusIcon, FormField, majorScale } from "evergreen-ui";
import React, { useState } from "react";
import { Select, SelectOption } from "shared/ui";
import { useFiltersStore } from "../hooks/useFiltersStore";
import { Filter } from "../model/filters";

type FiltersSelectProps = {
    filters: Filter[];
    title: string;
    label?: string;
    hint?: string;
};

export const FiltersSelect: React.FC<FiltersSelectProps> = ({
    filters,
    hint,
    title,
    label,
}) => {
    const filtersStore = useFiltersStore();

    const [selectedFilter, setSelectedFilter] = useState<Filter>(null);

    const onSelect = (option: SelectOption) => {
        const { label } = option;
        const filter = filters.find((filter) => filter.name === label);

        if (!filter) {
            return;
        }

        setSelectedFilter(filter);
        filtersStore.selectFilter({ ...filter, value: null });
    };

    const mapToSelectOptions = (): SelectOption[] => {
        return filters.map((filter) => ({
            label: filter.name,
            value: filter.name,
        }));
    };

    return (
        <Select
            title={title}
            options={mapToSelectOptions()}
            value={selectedFilter?.name}
            onSelect={onSelect}
            button={
                <Button
                    borderRadius="30px"
                    iconAfter={PlusIcon}
                    appearance="minimal"
                >
                    Add Filter
                </Button>
            }
        />
    );
};
