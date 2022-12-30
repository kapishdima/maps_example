import React from "react";
import { SelectManyInput } from "./SelectManyInput";
import { useGrapesService } from "features/Grapes/hooks/useGrapesService";
import { GrapesServiceProvider } from "features/Grapes";
import { useQuery } from "react-query";

export const GrapeVariatisSelect: React.FC = () => {
    return (
        <GrapesServiceProvider>
            <GrapeVariatisSelectView />
        </GrapesServiceProvider>
    );
};

export const GrapeVariatisSelectView: React.FC = () => {
    const grapesService = useGrapesService();

    const { data: grapes } = useQuery("grapes-select", () =>
        grapesService.fetchGrapes(null)
    );

    if (!grapes) {
        return null;
    }

    const grapesOptions = grapes?.data.map((grape) => ({
        value: grape.id,
        label: grape.name,
    }));

    return (
        <SelectManyInput
            name="grape_varieties"
            options={grapesOptions}
            title="Grape Varieties"
            label="Grape Varieties"
            buttonText="Select grape variatis"
            hasFilter={false}
            height={180}
        />
    );
};
