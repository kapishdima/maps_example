import { toWineCategoryDomainEntity } from "entities/common-data";
import { IWineCategoriesAPI } from "../api/wine-categories.api";
import { IWineCategoriesStore } from "../store/wine-categories.store";

export class WineCategoriesService {
    constructor(
        private readonly wineCategoriesAPI: IWineCategoriesAPI,
        private readonly wineCategoriesStore: IWineCategoriesStore
    ) {}

    async fetchAndSaveWineCategories() {
        const wineCategoriesFromStore =
            this.wineCategoriesStore.getAllWineCategories();

        if (wineCategoriesFromStore) {
            return { wineCategories: wineCategoriesFromStore };
        }

        const wineCategoriesFromApi =
            await this.wineCategoriesAPI.getWineCategories();
        const wineCategories = this.wineCategoriesStore.saveWineCategories(
            wineCategoriesFromApi.map(toWineCategoryDomainEntity)
        );

        return { wineCategories };
    }

    clearWineCategories = () => {
        this.wineCategoriesStore.clear();
    };
}
