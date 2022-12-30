import { LocaleDomainEntity } from "entities/locales";

export interface ILocalesStore {
    save: (locales: LocaleDomainEntity[]) => LocaleDomainEntity[];
    saveGeneralLocale: (locales: LocaleDomainEntity) => LocaleDomainEntity;
    getAllLocales: () => LocaleDomainEntity[];
    getOne: (id: number) => LocaleDomainEntity;
    getGeneralLocale: () => LocaleDomainEntity;
    clear: () => void;
}

export class LocalesStore implements ILocalesStore {
    LOCALES_STORE_KEY = "sea_of_wine/locales";
    GENERAL_LOCALE_STORE_KEY = "sea_of_wine/general_locale";

    constructor() {}

    public save(locales: LocaleDomainEntity[]): LocaleDomainEntity[] {
        localStorage.setItem(this.LOCALES_STORE_KEY, JSON.stringify(locales));

        return this.getAllLocales();
    }

    public getAllLocales(): LocaleDomainEntity[] {
        const localesFromStorage: LocaleDomainEntity[] = JSON.parse(
            localStorage.getItem(this.LOCALES_STORE_KEY)
        );

        return localesFromStorage;
    }

    public getOne(id: number): LocaleDomainEntity {
        const locales = this.getAllLocales();

        if (!locales) {
            return;
        }

        return locales.find((locale) => locale.id === id);
    }

    public saveGeneralLocale(locale: LocaleDomainEntity): LocaleDomainEntity {
        localStorage.setItem(
            this.GENERAL_LOCALE_STORE_KEY,
            JSON.stringify(locale)
        );

        return locale;
    }

    public getGeneralLocale(): LocaleDomainEntity {
        const generalLocal: LocaleDomainEntity = JSON.parse(
            localStorage.getItem(this.GENERAL_LOCALE_STORE_KEY)
        );

        return generalLocal;
    }

    public clear() {
        localStorage.removeItem(this.GENERAL_LOCALE_STORE_KEY);
        localStorage.removeItem(this.LOCALES_STORE_KEY);
    }
}
