import { GrapeResponseEntity } from "entities/grapes";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface IGrapesAPI {
    getGrapes: (
        options: GetListOptions
    ) => Promise<ListResponse<GrapeResponseEntity[]>>;
    getGrape: (id: string) => Promise<ListResponse<GrapeResponseEntity>>;
    deleteGrape: (id: number) => Promise<APIResponse<any>>;
    createGrape: (grape: GrapeResponseEntity) => Promise<GrapeResponseEntity>;
    updateGrape: (id: string, grape: GrapeResponseEntity) => Promise<void>;
}

export class GrapesAPI implements IGrapesAPI {
    constructor(private readonly client: IAPIClient) {}

    async getGrapes(
        options: GetListOptions
    ): Promise<ListResponse<GrapeResponseEntity[]>> {
        const { data: grapes } = await this.client.get<
            ListResponse<GrapeResponseEntity[]>
        >(this.createFetchGrapesURL(options));

        return grapes;
    }

    async getGrape(id: string): Promise<ListResponse<GrapeResponseEntity>> {
        const { data: grape } = await this.client.get<
            ListResponse<GrapeResponseEntity>
        >(`/api/grapeVarieties/${id}`);

        return grape;
    }

    async deleteGrape(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/grapeVarieties/${id}`);
    }

    public async createGrape(
        grape: GrapeResponseEntity
    ): Promise<GrapeResponseEntity> {
        const { data: createdGrape } = await this.client.post<
            ListResponse<GrapeResponseEntity>
        >("/api/grapeVarieties", grape);

        return createdGrape.data;
    }

    public async updateGrape(
        id: string,
        grape: GrapeResponseEntity
    ): Promise<void> {
        await this.client.patch(`/api/grapeVarieties/${id}`, grape);
    }

    private createFetchGrapesURL(options: GetListOptions) {
        if (!options) {
            return "/api/grapeVarieties?notPaginated=true";
        }

        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/grapeVarieties?page=${page || 1}&per_page=${
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
