import {
    LocaleDomainEntity,
    LocaleResponseEntity,
    toDomainEntity,
} from "entities/locales";

import { ILocalesAPI } from "../api/locales";
import { ILocalesStore } from "../store/locales.store";

export class LocalesService {
    GENERAL_LOCALE_NAME = "en";

    constructor(
        private readonly localesAPI: ILocalesAPI,
        private readonly localesStore: ILocalesStore
    ) {}

    public async fetchAndSaveLocales(): Promise<{
        locales: LocaleDomainEntity[];
        generalLocale: LocaleDomainEntity;
    }> {
        const localesFromStore = this.localesStore.getAllLocales();
        const generalLocaleFromStore = this.localesStore.getGeneralLocale();

        if (localesFromStore && generalLocaleFromStore) {
            return {
                locales: localesFromStore,
                generalLocale: generalLocaleFromStore,
            };
        }

        const localesFromAPI: LocaleResponseEntity[] =
            await this.localesAPI.getAllLocales();

        const generalLocale = this.setGeneralLocale(localesFromAPI);

        const locales = this.localesStore.save(
            localesFromAPI.map(toDomainEntity)
        );

        return {
            locales,
            generalLocale,
        };
    }

    setGeneralLocale(locales: LocaleResponseEntity[]): LocaleDomainEntity {
        const englishLocale = locales.find(
            (locale) => locale.locale === this.GENERAL_LOCALE_NAME
        );

        if (!englishLocale) {
            return;
        }

        return this.localesStore.saveGeneralLocale(
            toDomainEntity(englishLocale)
        );
    }

    clearLocales() {
        this.localesStore.clear();
    }
}
