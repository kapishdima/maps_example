import {
    TagRequestEntity,
    TagResponseEntity,
} from "entities/tag/tag-response.entity";
import { IAPIClient, ListResponse } from "shared/api";

export type TagsFilters = {
    name: string;
    locationId?: number;
    countryId?: number;
};

export interface ITagAPI {
    getTags: () => Promise<ListResponse<TagResponseEntity[]>>;
    createTags: (
        payload: TagRequestEntity
    ) => Promise<ListResponse<TagResponseEntity>>;
    searchTags: (
        filters: TagsFilters
    ) => Promise<ListResponse<TagResponseEntity[]>>;
}

export class TagAPI implements ITagAPI {
    constructor(private readonly client: IAPIClient) {}

    async getTags(): Promise<ListResponse<TagResponseEntity[]>> {
        const { data: tags } = await this.client.get<
            ListResponse<TagResponseEntity[]>
        >("/api/tags");

        return tags;
    }

    async createTags(
        payload: TagRequestEntity
    ): Promise<ListResponse<TagResponseEntity>> {
        const { data: tag } = await this.client.post<
            ListResponse<TagResponseEntity>
        >("/api/tags", payload);

        return tag;
    }

    async searchTags(
        filters: TagsFilters
    ): Promise<ListResponse<TagResponseEntity[]>> {
        const { data: tags } = await this.client.get<
            ListResponse<TagResponseEntity[]>
        >(`/api/tags${this.createFiltersUrl(filters)}`);

        return tags;
    }

    private createFiltersUrl(filters: TagsFilters) {
        let url = "?";
        for (const [key, value] of Object.entries(filters)) {
            const filterUrl = `${key}=${value}&`;

            url = url + filterUrl;
        }

        return url;
    }
}
