import { WineCategoryDomainEntity } from "../wine-category-domain";
import { WineCategoriesResponseEntity } from "../wine-category-response";

export const toDomainEntity = (
    wineCategory: WineCategoriesResponseEntity
): WineCategoriesResponseEntity => ({
    id: wineCategory.id,
    name: wineCategory.name,
});
