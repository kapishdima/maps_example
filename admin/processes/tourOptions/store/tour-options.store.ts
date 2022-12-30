import { TourOptionDomainEntity } from "entities/common-data";

export interface ITourOptionsStore {
    saveTourOptions: (
        tourOptions: TourOptionDomainEntity[]
    ) => TourOptionDomainEntity[];
    getAllTourOptions: () => TourOptionDomainEntity[];
    getOneTourOption: (id: number) => TourOptionDomainEntity;
    clear: () => void;
}
export class TourOptionsStore implements ITourOptionsStore {
    TOUR_OPTIONS_STORE_KEY = "sea_of_wine/tour_options";

    constructor() {}

    saveTourOptions(
        tourOptions: TourOptionDomainEntity[]
    ): TourOptionDomainEntity[] {
        localStorage.setItem(
            this.TOUR_OPTIONS_STORE_KEY,
            JSON.stringify(tourOptions)
        );

        return this.getAllTourOptions();
    }

    getAllTourOptions(): TourOptionDomainEntity[] {
        return JSON.parse(localStorage.getItem(this.TOUR_OPTIONS_STORE_KEY));
    }
    getOneTourOption(id: number): TourOptionDomainEntity {
        const tourOptionsFromStore = this.getAllTourOptions();

        if (!tourOptionsFromStore) {
            return;
        }

        return tourOptionsFromStore.find((tourOption) => tourOption.id === id);
    }

    clear() {
        localStorage.removeItem(this.TOUR_OPTIONS_STORE_KEY);
    }
}
