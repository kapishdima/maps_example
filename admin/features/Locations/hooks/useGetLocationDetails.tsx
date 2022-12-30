import { LocationResponseWithoutDetails } from "entities/location";
import { useLocationsService } from "processes/locations";
import { useQuery } from "react-query";

export const useGetLocationDetails = (
    defaultLocations?: LocationResponseWithoutDetails[]
) => {
    if (!defaultLocations) {
        return { locations: null, isFetching: false };
    }

    const locationsService = useLocationsService();
    const { data: locations, isFetching } = useQuery("locations", () =>
        locationsService.getLocationsByIds(
            defaultLocations.map(({ id }) => id.toString())
        )
    );

    return { locations, isFetching };
};
