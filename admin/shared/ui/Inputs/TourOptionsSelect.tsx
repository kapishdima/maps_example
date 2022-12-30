import React from "react";
import { useCommonDataContext } from "app/hooks";
import { SelectManyInput } from "./SelectManyInput";

export const TourOptionsSelect: React.FC = () => {
    const { tourOptions } = useCommonDataContext();

    if (!tourOptions) {
        return null;
    }

    const tourOptionsForSelect = tourOptions.map((region) => ({
        label: region.name,
        value: region.id,
    }));

    return (
        <SelectManyInput
            name="tour_options"
            options={tourOptionsForSelect}
            title="Tour Options"
            label="Tour Options "
            buttonText="Select tour options"
            hasFilter={false}
            height={180}
        />
    );
};
