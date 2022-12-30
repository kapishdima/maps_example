import {
    WineryDomainEntity,
    WineryRequestEntity,
    WineryResponseEntity,
} from "entities/winery";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface IWineriesAPI {
    getWineries: (
        options: GetListOptions
    ) => Promise<ListResponse<WineryResponseEntity[]>>;
    searchWineries: (
        name: string
    ) => Promise<ListResponse<WineryResponseEntity[]>>;
    getWinery: (id: string) => Promise<ListResponse<WineryResponseEntity>>;
    deleteWinery: (id: number) => Promise<APIResponse<any>>;
    createWinery: (
        winery: WineryRequestEntity
    ) => Promise<WineryResponseEntity>;
    updateWinery: (id: string, winery: WineryRequestEntity) => Promise<void>;
}

export class WineriesAPI implements IWineriesAPI {
    constructor(private readonly client: IAPIClient) {}

    async getWineries(
        options: GetListOptions
    ): Promise<ListResponse<WineryResponseEntity[]>> {
        const { data: wineries } = await this.client.get<
            ListResponse<WineryResponseEntity[]>
        >(this.createFetchWineriesURL(options));

        return wineries;
    }

    async searchWineries(
        query: string
    ): Promise<ListResponse<WineryResponseEntity[]>> {
        const { data: wineries } = await this.client.get<
            ListResponse<WineryResponseEntity[]>
        >(`/api/wineries?name=${query}`);

        return wineries;
    }

    async getWinery(id: string): Promise<ListResponse<WineryResponseEntity>> {
        const { data: winery } = await this.client.get<
            ListResponse<WineryResponseEntity>
        >(`/api/wineries/${id}`);

        return winery;
    }

    async deleteWinery(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/wineries/${id}`);
    }

    public async createWinery(
        winery: WineryRequestEntity
    ): Promise<WineryResponseEntity> {
        const { data: createdWinery } = await this.client.post<
            ListResponse<WineryResponseEntity>
        >("/api/wineries", winery);

        return createdWinery.data;
    }

    public async updateWinery(
        id: string,
        winery: WineryRequestEntity
    ): Promise<void> {
        await this.client.patch(`/api/wineries/${id}`, winery);
    }

    private createFetchWineriesURL(options: GetListOptions) {
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/wineries?page=${options.page || 1}&per_page=${
            options.size || 10
        }&${filterQueryParams}`;
    }

    private createFiltersURL(filters: ListFilter[]) {
        if (!filters || !filters.length) {
            return "";
        }

        let url = "";

        for (const filter of filters) {
            for (const [key, value] of Object.entries(filter)) {
                url = url + [key, value].join("=") + "&";
            }
        }

        return url;
    }
}
