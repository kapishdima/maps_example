export type RegionResponseEntity = {
    id: number;
    country_id: number;
    translations: RegionTranslations[];
};

export type RegionTranslations = {
    name: string;
    locale_id: number;
};
