import React from "react";
import { useFetchCountries } from "../hooks/useFetchCountries";

import { CountriesFilters } from "./CountriesFilters";
import { CountriesTable } from "./CountriesTable";

export const CountriesViewContent: React.FC = () => {
    const { countries, isFetching, applyFilters } = useFetchCountries();

    return (
        <>
            <CountriesFilters applyFilters={applyFilters} />
            <CountriesTable
                countries={countries}
                isFetching={isFetching}
                onDeleteCountry={(id: number) => false}
            />
        </>
    );
};
