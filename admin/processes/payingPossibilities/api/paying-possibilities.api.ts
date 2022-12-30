import { PayingPossibilityResponseEntity } from "entities/common-data";
import { IAPIClient } from "shared/api";

export interface IPayingPossibilitiesAPI {
    getPayingPossibilities: () => Promise<PayingPossibilityResponseEntity[]>;
}

export class PayingPossibilitiesAPI implements IPayingPossibilitiesAPI {
    constructor(private readonly client: IAPIClient) {}

    public async getPayingPossibilities(): Promise<
        PayingPossibilityResponseEntity[]
    > {
        const { data: payingPossilities } = await this.client.get<{
            data: PayingPossibilityResponseEntity[];
        }>("/api/payingPossibilities");

        return payingPossilities.data;
    }
}
