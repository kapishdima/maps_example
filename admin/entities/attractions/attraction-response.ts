import { MediaResponseEntity } from "./../../processes/media/models/media-domain.entity";
import { LocationResponseEntity } from "entities/location";
import { Contact } from "shared/types/contact";
import { StatusTypes } from "shared/ui";
import { AttractionTranslation } from "./attraction-translations";

export type AttractionResponseEntity = {
    id: number;
    country_id: number;
    admin_id: number;
    youtube: string;
    status: StatusTypes;
    created_at: string;
    updated_at: string;
    translations: AttractionTranslation[];
    location: LocationResponseEntity;
    contacts: Contact[];
    media: MediaResponseEntity[];
};
