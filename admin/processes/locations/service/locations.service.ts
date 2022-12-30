import { merge } from "lodash";

import { LocationResponseEntity, LocationViewEntity } from "entities/location";

import { ViewMapperService } from "processes/view-mapper";
import { ILocationAPI } from "../api/locations";
import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { LocationTranslation } from "entities/location/location-response";

export class LocationsService {
    private viewMapper: ViewMapperService;
    private localeStore: ILocalesStore;

    constructor(private readonly locationsAPI: ILocationAPI) {
        this.viewMapper = new ViewMapperService();
        this.localeStore = new LocalesStore();
    }

    async getLocationsByIds(ids: string[]): Promise<LocationViewEntity[]> {
        const locationsFromApi = await this.locationsAPI.getLocationsByIds(ids);

        const locationWithDetails = locationsFromApi.map((location) =>
            this.toLocationViewDetails(location)
        );

        return locationWithDetails;
    }

    async getLocationsByWayId(id: string): Promise<LocationViewEntity[]> {
        const locationsFromApi = await this.locationsAPI.getLocationsByWayId(
            id
        );

        const locationWithDetails = locationsFromApi.map((location) =>
            this.toLocationViewDetails(location)
        );

        return locationWithDetails;
    }

    async searchLocation(query: string): Promise<LocationViewEntity[]> {
        const locationsFromApi = await this.locationsAPI.search(query);
        const locationWithDetails = locationsFromApi.map((location) => {
            return this.toLocationViewDetails(location);
        });

        return locationWithDetails;
    }

    private toLocationViewDetails(
        location: LocationResponseEntity
    ): LocationViewEntity {
        const country = this.viewMapper.getCountryDetails(location);

        const locationViewDetails: LocationViewEntity = {
            id: location.id,
            name:
                this.getLocationNameFromTranslations(location) ||
                location.entity.name,

            country,
            address: location.address,
            lat: location.lat,
            lng: location.lng,
            type: location.entity_type,
            plusCode: location.plus_code,
            include: location.entity.include || false,
            order: location.entity.order,
        };

        delete locationViewDetails["country_id"];

        return locationViewDetails;
    }

    private getLocationNameFromTranslations(
        location: LocationResponseEntity
    ): string {
        if (!location.entity.translations) {
            return null;
        }
        const generalLocale = this.localeStore.getGeneralLocale();
        const locationTransation =
            TranslationsService.getTranslationFromGroup<LocationTranslation>(
                location.entity.translations,
                generalLocale
            );

        return locationTransation.name;
    }
}
