import { useAxiosClient } from "app/hooks";

import { LocalesAPI } from "../api/locales";
import { LocalesService } from "../services/locales.service";
import { LocalesStore } from "../store/locales.store";

export const useLocales = () => {
    const axiosClient = useAxiosClient();
    const localesAPI = new LocalesAPI(axiosClient);
    const localesStore = new LocalesStore();

    const localeService = new LocalesService(localesAPI, localesStore);

    const fetchAndSaveLocales = async () => {
        const { locales, generalLocale } =
            await localeService.fetchAndSaveLocales();

        return {
            locales,
            generalLocale,
        };
    };

    const clearLocales = () => {
        localeService.clearLocales();
    };

    return { fetchAndSaveLocales, clearLocales };
};
