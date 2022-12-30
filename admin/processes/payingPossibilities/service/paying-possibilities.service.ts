import { toPayingPossibilityDomainEntity } from "entities/common-data";
import { IPayingPossibilitiesAPI } from "../api/paying-possibilities.api";
import { IPayingPossibilitiesStore } from "../store/paying-possibilities.store";

export class PayingPossibilitiesService {
    constructor(
        private readonly payingPossibilitiesApi: IPayingPossibilitiesAPI,
        private readonly payingPossibilitiesStore: IPayingPossibilitiesStore
    ) {}

    async fetchAndSavePayingPossibilities() {
        const payingPossibilitiesFromStore =
            this.payingPossibilitiesStore.getAllPayingPossibilities();

        if (payingPossibilitiesFromStore) {
            return { payingPossibilities: payingPossibilitiesFromStore };
        }

        const payingPossibilitiesFromApi =
            await this.payingPossibilitiesApi.getPayingPossibilities();
        const payingPossibilities =
            this.payingPossibilitiesStore.savePayingPossibilities(
                payingPossibilitiesFromApi.map(toPayingPossibilityDomainEntity)
            );

        return { payingPossibilities };
    }

    clearPayingPossibilities() {
        this.payingPossibilitiesStore.clear();
    }
}
