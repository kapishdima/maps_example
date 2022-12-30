import React, { useEffect, useState } from "react";

import { SelectMenuItem } from "evergreen-ui";
import { useFiltersStore } from "./useFiltersStore";

export const useFilterStatuses = (inputName: string) => {
    const filterStore = useFiltersStore();
    const [selectedStatuses, setSelectedStatuses] = useState<SelectMenuItem[]>(
        []
    );

    const onSelect = (item: SelectMenuItem) => {
        setSelectedStatuses([...selectedStatuses, item]);
    };

    const onDelete = (selectedStatus: string) => {
        setSelectedStatuses((statuses) =>
            statuses.filter((status) => status.value !== selectedStatus)
        );
    };

    const saveToStore = () => {
        filterStore.changeFilterValue(
            inputName,
            selectedStatuses.map((status) => status.value)
        );
    };

    useEffect(() => {
        saveToStore();
    }, [selectedStatuses]);

    return {
        selectedStatuses,
        onSelect,
        onDelete,
    };
};
