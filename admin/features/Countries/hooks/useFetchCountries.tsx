import { CountryDomainEntity } from "entities/countries";
import { useList } from "shared/hooks";
import { useCountriesService } from "./useCountriesService";

export const useFetchCountries = () => {
    const countriesService = useCountriesService();

    const {
        applyFilters,
        pagination,
        data: countries,
        isFetching,
    } = useList<CountryDomainEntity[]>("countries", () =>
        countriesService.getCountries()
    );

    return {
        applyFilters,
        pagination,
        countries,
        isFetching,
    };
};
