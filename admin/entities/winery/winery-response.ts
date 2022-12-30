import { ContactPerson } from "shared/types/contact";
import { LocationResponseEntity } from "entities/location";
import { StatusTypes } from "shared/ui";
import { WineryTranslation } from "./winery-translations";
import { MediaResponseEntity } from "processes/media";

export type WineryResponseEntity = {
    id: number;
    country_id: number;
    accommodation: number;
    admin_id: number;
    status: StatusTypes;
    created_at: string;
    translations: WineryTranslation[];
    location: LocationResponseEntity;
    contacts: ContactPerson[];
    tour_options: number[];
    grape_varieties: number[];
    wine_categories: number[];
    staff_langs: number[];
    paying_possibilities: number[];
    type_of_businesses: number[];
    media: MediaResponseEntity[];
    thumbnail: MediaResponseEntity;
    image_id: MediaResponseEntity;
};

export type WineryRequestEntity = {
    id: number;
    country_id: number;
    accommodation: number;
    admin_id: number;
    status: StatusTypes;
    created_at: string;
    translations: WineryTranslation[];
    location: LocationResponseEntity;
    contacts: ContactPerson[];
    tour_options: number[];
    grape_varieties: number[];
    wine_categories: number[];
    staff_langs: number[];
    paying_possibilities: number[];
    type_of_businesses: number[];
    media: MediaResponseEntity[];
    thumbnail: number;
    image_id: number;
};
