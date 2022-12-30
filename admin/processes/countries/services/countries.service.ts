import {
    CountryDomainEntity,
    CountryResponseEntity,
    toDomainEntity,
} from "entities/countries";
import { CountryTranslation } from "entities/countries/countries-response";
import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";
import { GetListOptions, ListResponse } from "shared/api";
import { ICountriesAPI } from "../api/countries";
import { ICountriesStore } from "../store/countries.store";

export class CountriesService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(
        private readonly countriesAPI: ICountriesAPI,
        private readonly countriesStore: ICountriesStore
    ) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async getCountries(): Promise<ListResponse<CountryDomainEntity[]>> {
        const countriesFromApi = await this.countriesAPI.getCountries();

        if (!countriesFromApi) {
            return null;
        }

        const countriesWithDetails = countriesFromApi.data.map((country) =>
            this.mapToCountriesDetails(country)
        );

        return {
            data: countriesWithDetails,
            meta: countriesFromApi.meta,
        };
    }

    public async fetchAndSaveCurrentCountry(currentCountryId) {
        const currentCountryFromStore = this.countriesStore.getCurrentCountry();

        if (currentCountryFromStore) {
            return {
                currentCountry: currentCountryFromStore,
            };
        }

        const { data: countriesFromApi } =
            await this.countriesAPI.getCountries();
        const countryById = countriesFromApi.find(
            (country) => country.id === currentCountryId
        );

        if (!countryById) {
            return { currentCountry: null };
        }

        const currentCountry = this.countriesStore.saveCurrentCountry(
            toDomainEntity(countryById)
        );

        return { currentCountry };
    }

    public async fetchAndSaveCountries() {
        const countriesFromStore = this.countriesStore.getAllCountries();

        if (countriesFromStore) {
            return {
                countries: countriesFromStore,
            };
        }

        const { data: countriesFromApi } =
            await this.countriesAPI.getCountries();
        const counties = this.countriesStore.saveCountries(
            countriesFromApi.map(toDomainEntity)
        );

        return { counties };
    }

    public async getCountry(id: string): Promise<any> {
        const { data: countryFromApi } = await this.countriesAPI.getCountry(id);

        return countryFromApi;
    }

    public clearCountry(): void {
        this.countriesStore.clear();
    }

    public async updateCountry(id: string, country: CountryResponseEntity) {
        return await this.countriesAPI.updateCountry(id, {
            ...country,
            translations: Object.values(country.translations || {}),
        });
    }

    private mapToCountriesDetails(
        country: CountryResponseEntity
    ): CountryDomainEntity {
        const translation = this.getCountryTranslation(country);

        return {
            id: country.id,
            code: country.code,
            slug: country.slug,
            fullCode: country.full_code,
            localeId: country.locale_id,
            name: translation?.name,
        };
    }

    private getCountryTranslation(
        country: CountryResponseEntity
    ): CountryTranslation {
        if (!country.translations) {
            return null;
        }
        const generalLocale = this.localeStore.getGeneralLocale();
        const countryTransation = TranslationsService.getTranslationFromGroup(
            country.translations,
            generalLocale
        );

        delete countryTransation["id"];

        return countryTransation;
    }
}
