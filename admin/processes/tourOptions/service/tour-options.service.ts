import { toTourOptionDomainEntity } from "entities/common-data";
import { ITourOptionsAPI } from "../api/tour-options.api";
import { ITourOptionsStore } from "../store/tour-options.store";

export class TourOptionsService {
    constructor(
        private readonly tourOptionsAPI: ITourOptionsAPI,
        private readonly tourOptionsStore: ITourOptionsStore
    ) {}

    async fetchAndSaveTourOptions() {
        const tourOptionsFromStore = this.tourOptionsStore.getAllTourOptions();

        if (tourOptionsFromStore) {
            return { tourOptions: tourOptionsFromStore };
        }

        const tourOptionsFromApi = await this.tourOptionsAPI.getTourOptions();
        const tourOptions = this.tourOptionsStore.saveTourOptions(
            tourOptionsFromApi.map(toTourOptionDomainEntity)
        );

        return { tourOptions };
    }

    clearTourOptions = () => {
        this.tourOptionsStore.clear();
    };
}
