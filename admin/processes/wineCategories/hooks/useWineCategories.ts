import { useAxiosClient } from "app/hooks";

import { WineCategoriesAPI } from "../api/wine-categories.api";
import { WineCategoriesService } from "../service/wine-categories.service";
import { WineCategoriesStore } from "../store/wine-categories.store";

export const useWineCategories = () => {
    const axiosClient = useAxiosClient();
    const wineCategoriesService = new WineCategoriesService(
        new WineCategoriesAPI(axiosClient),
        new WineCategoriesStore()
    );

    const fetchAndSaveWineCategories = async () => {
        const { wineCategories } =
            await wineCategoriesService.fetchAndSaveWineCategories();

        return { wineCategories };
    };

    const clearWineCategories = () => {
        wineCategoriesService.clearWineCategories();
    };

    return { fetchAndSaveWineCategories, clearWineCategories };
};
