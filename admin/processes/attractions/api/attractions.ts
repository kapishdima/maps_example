import { AttractionResponseEntity } from "entities/attractions";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface IAttractionsAPI {
    getAttractions: (
        options: GetListOptions
    ) => Promise<ListResponse<AttractionResponseEntity[]>>;
    getAttraction: (
        id: string
    ) => Promise<ListResponse<AttractionResponseEntity>>;
    deleteAttraction: (id: number) => Promise<APIResponse<any>>;
    createAttraction: (
        attraction: AttractionResponseEntity
    ) => Promise<AttractionResponseEntity>;
    updateAttraction: (
        id: string,
        attraction: AttractionResponseEntity
    ) => Promise<void>;
}

export class AttractionsAPI implements IAttractionsAPI {
    constructor(private readonly client: IAPIClient) {}

    async getAttractions(
        options: GetListOptions
    ): Promise<ListResponse<AttractionResponseEntity[]>> {
        const { data: attractions } = await this.client.get<
            ListResponse<AttractionResponseEntity[]>
        >(this.createFetchAttractionsURL(options));

        return attractions;
    }

    async getAttraction(
        id: string
    ): Promise<ListResponse<AttractionResponseEntity>> {
        const { data: attraction } = await this.client.get<
            ListResponse<AttractionResponseEntity>
        >(`/api/attractions/${id}`);

        return attraction;
    }

    async deleteAttraction(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/attractions/${id}`);
    }

    public async createAttraction(
        attraction: AttractionResponseEntity
    ): Promise<AttractionResponseEntity> {
        const { data: createdAttraction } = await this.client.post<
            ListResponse<AttractionResponseEntity>
        >("/api/attractions", attraction);

        return createdAttraction.data;
    }

    public async updateAttraction(
        id: string,
        attraction: AttractionResponseEntity
    ): Promise<void> {
        await this.client.patch(`/api/attractions/${id}`, attraction);
    }

    private createFetchAttractionsURL(options: GetListOptions) {
        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/attractions?page=${page || 1}&per_page=${
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
