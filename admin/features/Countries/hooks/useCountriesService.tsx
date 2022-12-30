import React from "react";
import { CountryServiceContext } from "../providers/CountriesServiceProvider";

export const useCountriesService = () => {
    return React.useContext(CountryServiceContext);
};
