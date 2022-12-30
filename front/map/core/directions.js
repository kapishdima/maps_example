import { toLatLng } from "../utils";

import { first, last, without } from "lodash";

let directionsRenderers = [];
const MIN_LOCATIONS = 2;

export const createDirectionsRenderer = () => {
    return new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
            strokeWeight: 2,
            strokeColor: "#202645",
        },
    });
};

const render = (route, map) => {
    const directionsRenderer = createDirectionsRenderer();
    directionsRenderers.push(directionsRenderer);

    directionsRenderer.setDirections(route);
    directionsRenderer.setMap(map);
};

export const clearDirection = () => {
    for (const renderer of directionsRenderers) {
        renderer.setMap(null);
    }

    directionsRenderers = [];
};

export const createDirection = async (origin, destination, waypoints) => {
    try {
        const directionsService = new google.maps.DirectionsService();

        const result = await directionsService.route({
            origin: toLatLng(origin.lat, origin.lng),
            destination: toLatLng(destination.lat, destination.lng),
            waypoints: waypoints.map((waypoint) => ({
                location: toLatLng(waypoint.lat, waypoint.lng),
                stopover: true,
            })),
            travelMode: google.maps.TravelMode.DRIVING,
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export const renderDirection = async (locations, map) => {
    try {
        if (!locations || !locations?.length || !hasMinLocation(locations)) {
            return;
        }

        clearDirection();

        const origin = first(locations);
        const destination = last(locations);
        const waypoints = without(locations, origin, destination);

        const result = await createDirection(origin, destination, waypoints);

        if (!result || result.status !== google.maps.DirectionsStatus.OK) {
            return;
        }

        return render(result, map);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const hasMinLocation = (locations) => {
    return locations.length >= MIN_LOCATIONS;
};
