import { GetListOptions, IAPIClient, ListResponse } from "shared/api";
import { RegionResponseEntity } from "entities/region/region-response";
import { ListFilter } from "shared/api/types";

export interface IRegionAPI {
    fetchRegions: (
        options?: GetListOptions
    ) => Promise<ListResponse<RegionResponseEntity[]>>;
    getRegion: (id: string) => Promise<ListResponse<RegionResponseEntity>>;
    updateRegion: (id: string, region: RegionResponseEntity) => Promise<void>;
    deleteRegion: (id: number) => Promise<void>;
    createRegion: (
        region: RegionResponseEntity
    ) => Promise<ListResponse<RegionResponseEntity>>;
}

export class RegionsAPI implements IRegionAPI {
    constructor(private readonly client: IAPIClient) {}

    async fetchRegions(
        options?: GetListOptions
    ): Promise<ListResponse<RegionResponseEntity[]>> {
        const { data: regions } = await this.client.get<
            ListResponse<RegionResponseEntity[]>
        >(this.createFetchRegionsURL(options));

        return regions;
    }

    async getRegion(id: string): Promise<ListResponse<RegionResponseEntity>> {
        const { data: region } = await this.client.get<
            ListResponse<RegionResponseEntity>
        >(`/api/regions/${id}`);

        return region;
    }

    async createRegion(
        region: RegionResponseEntity
    ): Promise<ListResponse<RegionResponseEntity>> {
        const { data } = await this.client.post<
            ListResponse<RegionResponseEntity>
        >("/api/regions", region);
        return data;
    }

    async updateRegion(
        id: string,
        region: RegionResponseEntity
    ): Promise<void> {
        await this.client.patch(`/api/regions/${id}`, region);
    }

    async deleteRegion(id: number) {
        await this.client.delete(`/api/regions/${id}`);
    }

    private createFetchRegionsURL(options?: GetListOptions) {
        if (!options) {
            return "/api/regions";
        }

        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/regions?${page ? `page=${page}` : ""}${
            size ? `&per_page=${size}` : ""
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
