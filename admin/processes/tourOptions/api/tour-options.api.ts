import { TourOptionsResponseEntity } from "entities/common-data";
import { IAPIClient } from "shared/api";

export interface ITourOptionsAPI {
    getTourOptions: () => Promise<TourOptionsResponseEntity[]>;
}

export class TourOptionsAPI implements ITourOptionsAPI {
    constructor(private readonly client: IAPIClient) {}

    public async getTourOptions(): Promise<TourOptionsResponseEntity[]> {
        const { data: tourOptions } = await this.client.get<{
            data: TourOptionsResponseEntity[];
        }>("/api/tourOptions");

        return tourOptions.data;
    }
}
