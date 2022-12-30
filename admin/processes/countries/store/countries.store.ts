import { CountryDomainEntity } from "entities/countries";

export interface ICountriesStore {
    saveCountries: (countries: CountryDomainEntity[]) => CountryDomainEntity[];
    saveCurrentCountry: (country: CountryDomainEntity) => CountryDomainEntity;
    getCurrentCountry: () => CountryDomainEntity;
    getAllCountries: () => CountryDomainEntity[];
    getCountry: (id: number) => CountryDomainEntity;
    clear: () => void;
}

export class CountriesStore implements ICountriesStore {
    COUNTRIES_STORE_KEY = "sea_of_wine/counties";
    CURRENT_COUNTRY_STORE_KEY = "sea_of_wine/current_counties";

    constructor() {}

    public saveCountries(
        countries: CountryDomainEntity[]
    ): CountryDomainEntity[] {
        localStorage.setItem(
            this.COUNTRIES_STORE_KEY,
            JSON.stringify(countries)
        );

        return this.getAllCountries();
    }

    public saveCurrentCountry(country: CountryDomainEntity) {
        localStorage.setItem(
            this.CURRENT_COUNTRY_STORE_KEY,
            JSON.stringify(country)
        );

        return this.getCurrentCountry();
    }

    public getCurrentCountry(): CountryDomainEntity {
        const countryFromStore = JSON.parse(
            localStorage.getItem(this.CURRENT_COUNTRY_STORE_KEY)
        );

        return countryFromStore;
    }

    public getAllCountries(): CountryDomainEntity[] {
        const countriesFromStore: CountryDomainEntity[] = JSON.parse(
            localStorage.getItem(this.COUNTRIES_STORE_KEY)
        );

        return countriesFromStore;
    }

    public getCountry(id: number): CountryDomainEntity {
        const countriesFromStore = this.getAllCountries();

        if (!countriesFromStore) {
            return null;
        }

        return countriesFromStore.find((country) => country.id === id);
    }

    public clear() {
        localStorage.removeItem(this.COUNTRIES_STORE_KEY);
        localStorage.removeItem(this.CURRENT_COUNTRY_STORE_KEY);
    }
}
