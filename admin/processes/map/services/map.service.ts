import { first, last, without } from "lodash";
import { Center, CreateDirectionFunction, MapOptions } from "../model/types";
import { LocationViewEntity } from "entities/location";

interface IMapService {
    createDirection: CreateDirectionFunction;
    getCenter: (contry: string) => Center | Promise<Center>;
}

export class MapService implements IMapService {
    map: google.maps.Map;
    options: MapOptions;

    directionsService: google.maps.DirectionsService;
    directionRenderers: google.maps.DirectionsRenderer[];

    ROUTE_MAX_LOCATIONS = 10;
    ROUTE_MIN_LOCATIONS = 2;

    constructor(map: google.maps.Map, options: MapOptions) {
        if (!map) {
            throw new Error(`Object map must be defined. Recieved ${map}`);
        }

        this.map = map;
        this.options = options;

        this.setupDirection();
    }

    private setupDirection() {
        this.directionsService = new google.maps.DirectionsService();
        this.directionRenderers = [new google.maps.DirectionsRenderer()];

        this.render();
    }

    public async getCenter() {
        try {
            const geocodingService = new google.maps.Geocoder();
            const { results } = await geocodingService.geocode({
                address: this.options.country,
            });

            if (!results || !results.length) {
                return;
            }

            const center = results[0].geometry.location;

            return { lat: center.lat(), lng: center.lng() };
        } catch (error) {
            throw new Error(error);
        }
    }

    public async createDirection(locations: LocationViewEntity[]) {
        try {
            if (!this.hasMinLocation(locations)) {
                return;
            }

            if (this.hasMaxLocation(locations)) {
                this.directionRenderers.push(
                    new google.maps.DirectionsRenderer()
                );
            }

            const origin = first(locations);
            const destination = last(locations);
            const waypoints = without(locations, origin, destination);

            const route = await this.directionsService.route({
                origin: this.createLatLng(origin.lat, origin.lng),
                destination: this.createLatLng(
                    destination.lat,
                    destination.lng
                ),
                waypoints: waypoints.map((waypoint) => ({
                    location: this.createLatLng(waypoint.lat, waypoint.lng),
                    stopover: true,
                })),
                travelMode: google.maps.TravelMode.DRIVING,
            });

            if (!route) {
                return;
            }

            this.render(route);
        } catch (error) {
            throw error;
        }
    }

    public createMarker(location: LocationViewEntity) {
        if (!location) {
            return;
        }

        return new google.maps.Marker({
            position: this.createLatLng(location.lat, location.lng),
            map: this.map,
        });
    }

    private createLatLng(lat: string, lng: string) {
        return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
    }

    private isEmpty(chunk: LocationViewEntity[]) {
        return Boolean(!chunk.length);
    }

    private hasMinLocation(chunk: LocationViewEntity[]) {
        return chunk.length >= this.ROUTE_MIN_LOCATIONS;
    }

    private hasMaxLocation(chunk: LocationViewEntity[]) {
        return chunk.length === this.ROUTE_MAX_LOCATIONS;
    }

    private render(route?: google.maps.DirectionsResult) {
        const directionRenderer = new google.maps.DirectionsRenderer();
        directionRenderer.setDirections(route);
        directionRenderer.setMap(this.map);
        // this.directionRenderers.forEach((renderer) => {
        //     renderer.setMap(this.map);

        //     if (!route) {
        //         return;
        //     }

        //     renderer.setDirections(route);
        // });
    }

    private clearRenderer() {
        this.directionRenderers = [new google.maps.DirectionsRenderer()];
    }
}
