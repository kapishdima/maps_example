import { SettingsResponseEntity } from "entities/settings";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface ISettingsAPI {
    getManySettings: (
        options: GetListOptions
    ) => Promise<ListResponse<SettingsResponseEntity[]>>;
    getSettings: (id: string) => Promise<ListResponse<SettingsResponseEntity>>;
    deleteSettings: (id: number) => Promise<APIResponse<any>>;
    updateSettings: (id: string, settings: any) => Promise<void>;
}

export class SettingsAPI implements ISettingsAPI {
    constructor(private readonly client: IAPIClient) {}

    async getManySettings(
        options: GetListOptions
    ): Promise<ListResponse<SettingsResponseEntity[]>> {
        const { data: settings } = await this.client.get<
            ListResponse<SettingsResponseEntity[]>
        >(this.createFetchSettingsURL(options));

        return settings;
    }

    async getSettings(
        id: string
    ): Promise<ListResponse<SettingsResponseEntity>> {
        const { data: settings } = await this.client.get<
            ListResponse<SettingsResponseEntity>
        >(`/api/settings/${id}`);

        return settings;
    }

    async deleteSettings(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/settings/${id}`);
    }

    public async updateSettings(id: string, settings: any): Promise<void> {
        await this.client.patch(`/api/settings/${id}`, settings);
    }

    private createFetchSettingsURL(options: GetListOptions) {
        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/settings?page=${page || 1}&per_page=${
            size || 10
        }&${filterQueryParams}`;
    }

    private createFiltersURL(filters: ListFilter[]) {
        if (!filters || !filters.length) {
            return "";
        }

        let url = "";
        // FIXME: Это че такое?
        for (const filter of filters) {
            for (const [key, value] of Object.entries(filter)) {
                url = url + [key, value].join("=") + "&";
            }
        }

        return url;
    }
}
