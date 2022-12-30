import { useAxiosClient } from "app/hooks";

import { TourOptionsAPI } from "../api/tour-options.api";
import { TourOptionsService } from "../service/tour-options.service";
import { TourOptionsStore } from "../store/tour-options.store";

export const useTourOptions = () => {
    const axiosClient = useAxiosClient();
    const tourOptionsService = new TourOptionsService(
        new TourOptionsAPI(axiosClient),
        new TourOptionsStore()
    );

    const fetchAndSaveTourOptions = async () => {
        const { tourOptions } =
            await tourOptionsService.fetchAndSaveTourOptions();

        return { tourOptions };
    };

    const clearTourOptions = () => {
        tourOptionsService.clearTourOptions();
    };

    return { fetchAndSaveTourOptions, clearTourOptions };
};
