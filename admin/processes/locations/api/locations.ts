import { IAPIClient, ListResponse } from "shared/api";

import { LocationResponseEntity } from "entities/location";

export interface ILocationAPI {
    getLocationsByIds: (ids: string[]) => Promise<LocationResponseEntity[]>;
    getLocationsByWayId: (id: string) => Promise<LocationResponseEntity[]>;
    search: (query: string) => Promise<LocationResponseEntity[]>;
}
export class LocationsAPI implements ILocationAPI {
    constructor(private readonly client: IAPIClient) {}

    async getLocationsByIds(ids: string[]): Promise<LocationResponseEntity[]> {
        const urlWithIds = this.createQueryUrlWithIds(ids);
        const { data: locations } = await this.client.get<
            ListResponse<LocationResponseEntity[]>
        >(`/api/locations${urlWithIds}`);

        return locations.data;
    }

    async getLocationsByWayId(id: string): Promise<LocationResponseEntity[]> {
        const { data: locations } = await this.client.get<
            ListResponse<LocationResponseEntity[]>
        >(`/api/locations?way_id=${id}`);

        return locations.data;
    }

    async search(query: string): Promise<LocationResponseEntity[]> {
        const { data: locations } = await this.client.get<
            ListResponse<LocationResponseEntity[]>
        >(`/api/locations/search?q=${query}`);

        return locations.data;
    }

    private createQueryUrlWithIds = (ids: string[]): string => {
        return ids.reduce((url, id) => url + `ids[]=${id}&`, "?").slice(0, -1);
    };
}
