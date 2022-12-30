import { LocationViewEntity } from "entities/location";
import { WayResponseEntity } from "entities/ways";
import { useLocationsService } from "processes/locations";
import { useWaysService } from "processes/ways";
import { useGetResourceById } from "shared/hooks";

export const useGetWayById = () => {
    const wayService = useWaysService();
    const locationsService = useLocationsService();

    const getWayWithLocations = async (
        id: string
    ): Promise<WayResponseEntity<LocationViewEntity[]>> => {
        const way = await wayService.getWay(id);
        const locations = await locationsService.getLocationsByWayId(id);

        return {
            ...way,
            locations: locations.map((location) => ({
                ...location,
                include: location.include,
            })),
        };
    };

    const { data: way, isFetching } = useGetResourceById("way", (id: string) =>
        getWayWithLocations(id)
    );

    return { way, isFetching };
};
