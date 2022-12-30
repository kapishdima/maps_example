import { MediaResponseEntity } from "processes/media";
import { Contact } from "shared/types/contact";
import { StatusTypes } from "shared/ui";
import { EventTranslation } from "./event-translations";

export type EventResponseEntity = {
    id: number;
    country_id: number;
    admin_id: number;
    region_id: number;
    status: StatusTypes;
    date: string;
    created_at: string;
    updated_at: string;
    translations: EventTranslation[];
    contacts: Contact[];
    month: number;
    media: MediaResponseEntity[];
    image_id: MediaResponseEntity;
};
