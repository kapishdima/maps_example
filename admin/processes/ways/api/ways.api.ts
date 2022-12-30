import { WayRequestEntity, WayResponseEntity } from "entities/ways";
import { GetListOptions, IAPIClient, ListResponse } from "shared/api";

export interface IWaysAPI {
    getWays: (
        options: GetListOptions
    ) => Promise<ListResponse<WayResponseEntity[]>>;
    getWay: (id: string) => Promise<ListResponse<WayResponseEntity>>;
    updateWay: (id: string, way: WayRequestEntity) => Promise<void>;
    createWay: (way: WayRequestEntity) => Promise<WayResponseEntity>;
    deleteWay: (id: number) => Promise<void>;
}

export class WaysAPI implements IWaysAPI {
    constructor(private readonly client: IAPIClient) {}

    async getWays(
        options: GetListOptions
    ): Promise<ListResponse<WayResponseEntity[]>> {
        const { data: ways } = await this.client.get<
            ListResponse<WayResponseEntity[]>
        >(`/api/ways?page=${options.page || 1}&per_page=${options.size || 10}`);

        return ways;
    }

    async getWay(id: string): Promise<ListResponse<WayResponseEntity>> {
        const { data: way } = await this.client.get<
            ListResponse<WayResponseEntity>
        >(`/api/ways/${id}`);

        return way;
    }

    async updateWay(id: string, way: WayRequestEntity): Promise<void> {
        await this.client.patch(`/api/ways/${id}`, way);
    }

    async createWay(way: WayRequestEntity): Promise<WayResponseEntity> {
        const { data: createdWay } = await this.client.post<
            ListResponse<WayResponseEntity>
        >("/api/ways/", way);

        return createdWay.data;
    }

    async deleteWay(id: number): Promise<void> {
        await this.client.delete(`/api/ways/${id}`);
    }
}
