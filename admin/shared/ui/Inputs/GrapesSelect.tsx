import React from "react";
import { SelectManyInput } from "./SelectManyInput";
import { useFetchGrapes } from "features/Grapes";

type GrapesSelectProps = {
    required?: boolean;
};

export const GrapesSelect: React.FC<GrapesSelectProps> = ({ required }) => {
    const { grapes } = useFetchGrapes();

    if (!grapes) {
        return null;
    }

    const grapeOptions = grapes.data.map((grape) => ({
        label: grape.name,
        value: grape.id,
    }));

    return (
        <SelectManyInput
            required={required}
            name="grape_varieties"
            options={grapeOptions}
            title="Grape types of this country"
            label="Grape types of this country"
            buttonText="Select grape types"
            hasFilter={false}
            height={180}
        />
    );
};
