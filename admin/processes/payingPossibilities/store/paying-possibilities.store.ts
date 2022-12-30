import { PayingPossibilityDomainEntity } from "entities/common-data";

export interface IPayingPossibilitiesStore {
    savePayingPossibilities: (
        payingPossibilities: PayingPossibilityDomainEntity[]
    ) => PayingPossibilityDomainEntity[];
    getAllPayingPossibilities(): PayingPossibilityDomainEntity[];
    getOnePayingPossibility: (id: number) => PayingPossibilityDomainEntity;
    clear: () => void;
}
export class PayingPossibilitiesStore implements IPayingPossibilitiesStore {
    PAYING_POSSIBILITIES_STORE_KEY = "sea_of_wine/paying_possibilities";

    constructor() {}

    savePayingPossibilities(
        payingPossibilities: PayingPossibilityDomainEntity[]
    ): PayingPossibilityDomainEntity[] {
        localStorage.setItem(
            this.PAYING_POSSIBILITIES_STORE_KEY,
            JSON.stringify(payingPossibilities)
        );

        return this.getAllPayingPossibilities();
    }

    getAllPayingPossibilities(): PayingPossibilityDomainEntity[] {
        const payingPossibilitiesFromStore = JSON.parse(
            localStorage.getItem(this.PAYING_POSSIBILITIES_STORE_KEY)
        );

        return payingPossibilitiesFromStore;
    }
    getOnePayingPossibility(id: number): PayingPossibilityDomainEntity {
        const payingPossibilitiesFromStore = this.getAllPayingPossibilities();

        if (!payingPossibilitiesFromStore) {
            return;
        }

        return payingPossibilitiesFromStore.find(
            (payingPossibility) => payingPossibility.id === id
        );
    }

    clear() {
        localStorage.removeItem(this.PAYING_POSSIBILITIES_STORE_KEY);
    }
}
