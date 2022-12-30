import React, { useState } from "react";
import { useFiltersStore } from "./useFiltersStore";

export const useFilterInput = (inputName) => {
    const [isEditMode, setEditMode] = useState(true);
    const [value, setValue] = useState<string>();

    const filtersStore = useFiltersStore();

    const onKeyEnterPresssed = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key !== "Enter" || isInputEmpty()) {
            return;
        }

        setEditMode(true);
    };

    const onBlur = () => {
        if (isInputEmpty()) {
            return;
        }
        setEditMode(false);
    };

    const onClick = () => {
        setEditMode(true);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setValue(value);
        filtersStore.changeFilterValue(inputName, value);
    };

    const isInputEmpty = () => {
        return !value.length || value === "";
    };

    return {
        isEditMode,
        value,
        onBlur,
        onClick,
        onChange,
        onKeyEnterPresssed,
    };
};
