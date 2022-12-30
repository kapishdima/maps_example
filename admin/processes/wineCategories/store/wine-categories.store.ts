import { WineCategoryDomainEntity } from "entities/common-data";

export interface IWineCategoriesStore {
    saveWineCategories: (
        wineCategories: WineCategoryDomainEntity[]
    ) => WineCategoryDomainEntity[];
    getAllWineCategories: () => WineCategoryDomainEntity[];
    getOneWineCategory: (id: number) => WineCategoryDomainEntity;
    clear: () => void;
}
export class WineCategoriesStore implements IWineCategoriesStore {
    WINE_CATEGORIES_STORE_KEY = "sea_of_wine/wine_categories";

    constructor() {}

    saveWineCategories(
        wineCategories: WineCategoryDomainEntity[]
    ): WineCategoryDomainEntity[] {
        localStorage.setItem(
            this.WINE_CATEGORIES_STORE_KEY,
            JSON.stringify(wineCategories)
        );

        return this.getAllWineCategories();
    }

    getAllWineCategories(): WineCategoryDomainEntity[] {
        return JSON.parse(localStorage.getItem(this.WINE_CATEGORIES_STORE_KEY));
    }
    getOneWineCategory(id: number): WineCategoryDomainEntity {
        const wineCategoriesFromStore = this.getAllWineCategories();

        if (!wineCategoriesFromStore) {
            return;
        }

        return wineCategoriesFromStore.find(
            (tourOption) => tourOption.id === id
        );
    }

    clear() {
        localStorage.removeItem(this.WINE_CATEGORIES_STORE_KEY);
    }
}
