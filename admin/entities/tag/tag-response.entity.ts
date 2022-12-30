export type TagResponseEntity = {
    id: number;
    name: string;
    country_id: number;
};

export type TagRequestEntity = {
    name: string;
    country_id?: number;
    translation: string;
};
