import { LocationResponseWithoutDetails } from "entities/location";
import { MediaResponseEntity } from "processes/media";
import { StatusTypes } from "shared/ui";

export type WayTranslation = {
    id: number;
    way_id: number;
    locale_id: number;
    name: string;
    text: string;
};

export type WayResponseEntity<L = LocationResponseWithoutDetails[]> = {
    id: number;
    country_id: number;
    admin_id: number;
    status: StatusTypes;
    created_at: string;
    updated_at: string;
    translations: WayTranslation[];
    locations: L;
    media: MediaResponseEntity[];
    thumbnail_id: MediaResponseEntity;
    image: MediaResponseEntity;
};

export type WayRequestEntity<L = LocationResponseWithoutDetails[]> = {
    id: number;
    country_id: number;
    admin_id: number;
    status: StatusTypes;
    created_at: string;
    updated_at: string;
    translations: WayTranslation[];
    locations: L;
    media: MediaResponseEntity[];
    thumbnail_id: number;
    image_id: number;
};
