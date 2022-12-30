import { useAxiosClient } from "app/hooks";
import { useGetMe } from "processes/auth";

import { CountriesAPI } from "../api/countries";
import { CountriesService } from "../services/countries.service";
import { CountriesStore } from "../store/countries.store";

export const useCountries = () => {
    const { fetchUser } = useGetMe();
    const axiosClient = useAxiosClient();

    const countriesService = new CountriesService(
        new CountriesAPI(axiosClient),
        new CountriesStore()
    );

    const fetchAndSaveCountries = async () => {
        const user = await fetchUser();

        const { currentCountry } =
            await countriesService.fetchAndSaveCurrentCountry(user.countryId);
        const { countries } = await countriesService.fetchAndSaveCountries();

        return { countries, currentCountry };
    };

    const clearCountries = () => {
        countriesService.clearCountry();
    };

    return {
        fetchAndSaveCountries,
        clearCountries,
    };
};
