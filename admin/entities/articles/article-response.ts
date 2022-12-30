import { MediaResponseEntity } from "processes/media";
import { StatusTypes } from "shared/ui";

export type ArticleResponseEntity = {
    id: number;
    admin_id: number;
    status: StatusTypes;
    slug: string;
    title: string;
    content: any;
    media: MediaResponseEntity[];
    thumbnail: MediaResponseEntity;
    created_at: string;
    updated_at: string;
};
