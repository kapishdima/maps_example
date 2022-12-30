import React from "react";
import { useCommonDataContext } from "app/hooks";
import { SelectInput } from "./SelectInput";
import { useAuthStore } from "processes/auth";

type CountriesSelectProps = {
    name?: string;
    required?: boolean;
};

export const CountriesSelect: React.FC<CountriesSelectProps> = ({
    name,
    required,
}) => {
    const { countries } = useCommonDataContext();
    const { user } = useAuthStore();
    if (!countries || user.role !== "superadmin") {
        return null;
    }

    const countriesForSelect = countries.map((country) => ({
        label: country.slug.toUpperCase(),
        value: country.id,
    }));

    return (
        <SelectInput
            name={name || "country_id"}
            required={required}
            options={countriesForSelect}
            title="Countries"
            label="Country"
            buttonText="Select country"
            hasFilter={false}
            height={180}
        />
    );
};
