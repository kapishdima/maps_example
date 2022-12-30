import { useAxiosClient } from "app/hooks";
import { LocationsAPI } from "../api/locations";
import { LocationsService } from "../service/locations.service";

export const useLocationsService = () => {
    const axiosClient = useAxiosClient();
    const locationsService = new LocationsService(
        new LocationsAPI(axiosClient)
    );

    return locationsService;
};
