import { MediaResponseEntity } from "../../processes/media/models/media-domain.entity";

export type BlackSeaResponseEntity = {
    black_sea_slider_title: string;
    black_sea_slider_text: string;
    black_sea_slider: MediaResponseEntity[];
    black_sea_image: MediaResponseEntity;
    locations: any;
    countriesData: any;
};
