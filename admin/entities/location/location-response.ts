import { TagDomainEntity } from "entities/tag/tag-domain.entity";
import { LocationEntityTypes } from "./location-view";

export type LocationAdress = { [key: string]: string };

export type LocationResponseEntity = {
    id: number;
    address: LocationAdress;
    region_id: number;
    country_id: number;
    lat: string;
    lng: string;
    plus_code: string;
    tags: TagDomainEntity[];
    entity: any;
    entity_type: LocationEntityTypes;
    order?: number;
};

export type LocationResponseWithoutDetails = {
    id: number;
    order: number;
};

export type LocationTranslation = {
    name: string;
    locale_id: number;
};
