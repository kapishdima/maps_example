import { LocationResponseEntity } from "entities/location";
import { MediaResponseEntity } from "processes/media";
import { Contact } from "shared/types/contact";
import { StatusTypes } from "shared/ui";
import { HorecaTranslation } from "./horeca-translations";

export type HorecaResponseEntity = {
    id: number;
    type: string;
    country_id: number;
    admin_id: number;
    status: StatusTypes;
    created_at: string;
    updated_at: string;
    translations: HorecaTranslation[];
    location: LocationResponseEntity;
    contacts: Contact[];
    media: MediaResponseEntity[];
};
