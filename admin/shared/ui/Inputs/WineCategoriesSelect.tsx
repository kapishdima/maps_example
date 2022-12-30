import React from "react";
import { useCommonDataContext } from "app/hooks";
import { SelectManyInput } from "./SelectManyInput";

export const WineCategoriesSelect: React.FC = () => {
    const { wineCategories } = useCommonDataContext();

    if (!wineCategories) {
        return null;
    }

    const options = wineCategories.map((wc) => ({
        label: wc.name,
        value: wc.id,
    }));

    return (
        <SelectManyInput
            name="wine_categories"
            options={options}
            title="Wine Categories"
            label="Wine Categories "
            buttonText="Select wine categories"
            hasFilter={false}
            height={180}
        />
    );
};
