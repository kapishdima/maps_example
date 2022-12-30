import React from "react";
import { useCommonDataContext } from "app/hooks";
import { SelectManyInput } from "./SelectManyInput";

export const TypeOfBussinessSelect: React.FC = () => {
    const { typeOfBusiness } = useCommonDataContext();

    if (!typeOfBusiness) {
        return null;
    }

    const typeOfBusinessForSelect = typeOfBusiness.map((region) => ({
        label: region.name,
        value: region.id,
    }));

    return (
        <SelectManyInput
            name="type_of_businesses"
            options={typeOfBusinessForSelect}
            title="Type of Bussineses"
            label="Type of Bussineses "
            buttonText="Select type of bussineses"
            hasFilter={false}
            height={180}
        />
    );
};
