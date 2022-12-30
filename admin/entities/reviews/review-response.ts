import { WineryResponseEntity } from "entities/winery";
import { StatusTypes } from "shared/ui";

export type ReviewResponseEntity = {
    id: number;
    user_id: number;
    winery: WineryResponseEntity;
    rating: number;
    status: StatusTypes;
    comment: string;
    created_at: string;
    updated_at: string;
};
