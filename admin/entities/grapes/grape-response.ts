import { MediaResponseEntity } from "processes/media";
import { StatusTypes } from "shared/ui";
import { GrapeTranslation } from "./grape-translations";

export type GrapeResponseEntity = {
    id: number;
    media_id: MediaResponseEntity;
    status: StatusTypes;
    created_at: string;
    updated_at: string;
    translations: GrapeTranslation[];
    media: MediaResponseEntity[];
};
