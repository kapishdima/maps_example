import { SeodataResponseEntity } from "entities/seodatas";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface ISeodatasAPI {
    getSeodatas: (
        options: GetListOptions
    ) => Promise<ListResponse<SeodataResponseEntity[]>>;
    getSeodata: (id: string) => Promise<ListResponse<SeodataResponseEntity>>;
    deleteSeodata: (id: number) => Promise<APIResponse<any>>;
    createSeodata: (seodata: SeodataResponseEntity) => Promise<void>;
    updateSeodata: (
        id: string,
        seodata: SeodataResponseEntity
    ) => Promise<void>;
}

export class SeodatasAPI implements ISeodatasAPI {
    constructor(private readonly client: IAPIClient) {}

    async getSeodatas(
        options: GetListOptions
    ): Promise<ListResponse<SeodataResponseEntity[]>> {
        const { data: seodatas } = await this.client.get<
            ListResponse<SeodataResponseEntity[]>
        >(this.createFetchSeodatasURL(options));

        return seodatas;
    }

    async getSeodata(id: string): Promise<ListResponse<SeodataResponseEntity>> {
        const { data: seodata } = await this.client.get<
            ListResponse<SeodataResponseEntity>
        >(`/api/seodatas/${id}`);

        return seodata;
    }

    async deleteSeodata(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/seodatas/${id}`);
    }

    public async createSeodata(seodata: SeodataResponseEntity): Promise<void> {
        await this.client.post("/api/seodatas", seodata);
    }

    public async updateSeodata(
        id: string,
        seodata: SeodataResponseEntity
    ): Promise<void> {
        await this.client.patch(`/api/seodatas/${id}`, seodata);
    }

    private createFetchSeodatasURL(options: GetListOptions) {
        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/seodatas?page=${page || 1}&per_page=${
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
