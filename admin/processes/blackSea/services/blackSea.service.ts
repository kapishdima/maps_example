import { BlackSeaResponseEntity } from "entities/black-sea";

import { IBlackSeaAPI } from "../api/blackSea";

export class BlackSeaService {
    constructor(private readonly blackSeaAPI: IBlackSeaAPI) {}

    public async getBlackSea(): Promise<any> {
        const { data: blackSeaFromApi } = await this.blackSeaAPI.getBlackSea();

        return blackSeaFromApi;
    }

    public async updateBlackSea(blackSea: BlackSeaResponseEntity) {
        return await this.blackSeaAPI.updateBlackSea(blackSea);
    }
}
