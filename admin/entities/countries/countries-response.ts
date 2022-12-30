import { MediaResponseEntity } from "processes/media";

export type CountryTranslation = {
    name: string;
    country_id: number;
    locale_id: number;
    first_block_title: string;
    first_block_text: string;
    second_block_text: string;
    slider_block_title: string;
    slider_block_text: string;
    partner_title: string;
    partner_text: string;
    grape_varieties_title: string;
    grape_varieties_text: string;
    black_sea_text: string;
};

export type CountryResponseEntity = {
    id: number;
    code: string;
    full_code: string;
    locale_id: number;
    slug: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    translations: CountryTranslation[];
    media: MediaResponseEntity[];
    gallery: MediaResponseEntity[];
    main_image: MediaResponseEntity;
    secondary_image: MediaResponseEntity;
    thumbnail: MediaResponseEntity;
    partner_logo: MediaResponseEntity;
    second_block_image: MediaResponseEntity;
    wineries_list_image: MediaResponseEntity;
    routes_list_image: MediaResponseEntity;
    events_list_image: MediaResponseEntity;
    travel_agencies_list_image: MediaResponseEntity;
    grapes_list_image: MediaResponseEntity;
    black_sea_image: MediaResponseEntity;
    seodata: string;
};
