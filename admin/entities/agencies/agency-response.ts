import { MediaResponseEntity } from "processes/media";
import { StatusTypes } from "shared/ui";
import { AgencyTranslation } from "./agency-translations";

export type AgencyResponseEntity = {
    id: number;
    admin_id: number;
    country_id: number;
    status: StatusTypes;
    media_id: MediaResponseEntity;
    email: string;
    telephone: string;
    website: string;
    created_at: string;
    updated_at: string;
    translations: AgencyTranslation[];
};
