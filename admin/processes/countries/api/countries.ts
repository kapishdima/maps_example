import { IAPIClient, ListResponse } from "shared/api";
import { CountryResponseEntity } from "entities/countries";

export interface ICountriesAPI {
    getCountries: () => Promise<ListResponse<CountryResponseEntity[]>>;
    getCountry: (id: string) => Promise<ListResponse<CountryResponseEntity>>;
    updateCountry(id: string, country: any): Promise<void>;
}

export class CountriesAPI implements ICountriesAPI {
    constructor(private readonly client: IAPIClient) {}

    public async getCountries(): Promise<
        ListResponse<CountryResponseEntity[]>
    > {
        const { data: countries } = await this.client.get<
            ListResponse<CountryResponseEntity[]>
        >("/api/countries");

        return countries;
    }
    public async getCountry(
        id: string
    ): Promise<ListResponse<CountryResponseEntity>> {
        const { data: country } = await this.client.get<
            ListResponse<CountryResponseEntity>
        >(`/api/countries/${id}`);

        return country;
    }

    public async updateCountry(id: string, country: any): Promise<void> {
        await this.client.patch(`/api/countries/${id}`, country);
    }
}
