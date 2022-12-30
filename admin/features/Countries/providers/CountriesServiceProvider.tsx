import React from "react";
import {
    CountriesAPI,
    CountriesService,
    CountriesStore,
} from "processes/countries";
import { useAxiosClient } from "app/hooks";

export const CountryServiceContext =
    React.createContext<CountriesService>(null);

export const CountriesServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const countriesService = new CountriesService(
        new CountriesAPI(axiosClient),
        new CountriesStore()
    );

    return (
        <CountryServiceContext.Provider value={countriesService}>
            {children}
        </CountryServiceContext.Provider>
    );
};
