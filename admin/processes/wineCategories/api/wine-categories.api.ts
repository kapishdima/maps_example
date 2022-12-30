import { WineCategoriesResponseEntity } from "entities/common-data";
import { IAPIClient } from "shared/api";

export interface IWineCategoriesAPI {
    getWineCategories: () => Promise<WineCategoriesResponseEntity[]>;
}

export class WineCategoriesAPI implements IWineCategoriesAPI {
    constructor(private readonly client: IAPIClient) {}

    public async getWineCategories(): Promise<WineCategoriesResponseEntity[]> {
        const { data: tourOptions } = await this.client.get<{
            data: WineCategoriesResponseEntity[];
        }>("/api/wineCategories");

        return tourOptions.data;
    }
}
