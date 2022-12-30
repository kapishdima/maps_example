import { object, string, number, date, array } from "yup";
import {
    REQUIRED_MESSAGE,
    EMAIL_MESSAGE,
    MUST_BE_NUMBER,
    MUST_BE_STRING,
} from "./messages";
import { mediaSchema } from "./mediaSchema";

export const countrySchema = (requiredLocales) =>
    object({
        translations: object(
            requiredLocales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: object({
                        name: string().required(REQUIRED_MESSAGE),
                        first_block_title: string().required(REQUIRED_MESSAGE),
                        first_block_text: string().required(REQUIRED_MESSAGE),
                        second_block_text: string().required(REQUIRED_MESSAGE),
                        slider_block_title: string().required(REQUIRED_MESSAGE),
                        slider_block_text: string().required(REQUIRED_MESSAGE),
                        partner_title: string().required(REQUIRED_MESSAGE),
                        partner_text: string().required(REQUIRED_MESSAGE),
                        grape_varieties_title:
                            string().required(REQUIRED_MESSAGE),
                        grape_varieties_text:
                            string().required(REQUIRED_MESSAGE),
                    }),
                }),
                {}
            )
        ),
        main_image: number().required(REQUIRED_MESSAGE), // main_image
        secondary_image: number().required(REQUIRED_MESSAGE), // secondary_image
        thumbnail: number().required(REQUIRED_MESSAGE), // thumbnail
        partner_logo: number().required(REQUIRED_MESSAGE), // partner_logo
        second_block_image: number().required(REQUIRED_MESSAGE), // second_block_image
        wineries_list_image: number().required(REQUIRED_MESSAGE), // wineries_list_image
        routes_list_image: number().required(REQUIRED_MESSAGE), // routes_list_image
        events_list_image: number().required(REQUIRED_MESSAGE), // events_list_image
        travel_agencies_list_image: number().required(REQUIRED_MESSAGE), // travel_agencies_list_image
        grapes_list_image: number().required(REQUIRED_MESSAGE), // grapes_list_image
        media: array().of(mediaSchema()).nullable(),
    });
