import { LocaleResponseEntity } from "entities/locales";
import { IAPIClient, ListResponse } from "shared/api";

export interface ILocalesAPI {
    getAllLocales: () => Promise<LocaleResponseEntity[]>;
}

export class LocalesAPI implements ILocalesAPI {
    constructor(private readonly client: IAPIClient) {}

    public async getAllLocales(): Promise<LocaleResponseEntity[]> {
        const { data: locales } = await this.client.get<
            ListResponse<LocaleResponseEntity[]>
        >("/api/locales");

        return locales.data;
    }
}
