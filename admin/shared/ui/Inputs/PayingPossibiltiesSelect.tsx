import React from "react";
import { useCommonDataContext } from "app/hooks";
import { SelectManyInput } from "./SelectManyInput";

export const PayingPossibiltiesSelect: React.FC = () => {
    const { payingPossibilities } = useCommonDataContext();

    if (!payingPossibilities) {
        return null;
    }

    const payingPossibilitiesForSelect = payingPossibilities.map((pp) => ({
        label: pp.name,
        value: pp.id,
    }));

    return (
        <SelectManyInput
            name="paying_possibilities"
            options={payingPossibilitiesForSelect}
            title="Paying Posssibilities"
            label="Paying Posssibilities"
            buttonText="Select paying posssibilities"
            hasFilter={false}
            height={180}
        />
    );
};
