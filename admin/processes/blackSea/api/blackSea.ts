import { BlackSeaResponseEntity } from "entities/black-sea";
import { IAPIClient, ListResponse } from "shared/api";

export interface IBlackSeaAPI {
    getBlackSea: () => Promise<ListResponse<BlackSeaResponseEntity>>;
    updateBlackSea: (blackSea: any) => Promise<void>;
}

export class BlackSeaAPI implements IBlackSeaAPI {
    constructor(private readonly client: IAPIClient) {}

    async getBlackSea(): Promise<ListResponse<BlackSeaResponseEntity>> {
        const { data: blackSea } = await this.client.get<
            ListResponse<BlackSeaResponseEntity>
        >(`/api/blackSea`);

        return blackSea;
    }

    public async updateBlackSea(blackSea: any): Promise<void> {
        await this.client.patch(`/api/blackSea`, blackSea);
    }
}
