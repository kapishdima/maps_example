import { object, string, number, date, array } from "yup";
import { REQUIRED_MESSAGE } from "./messages";
import { mediaSchema } from "./mediaSchema";

const translatable = (requiredLocales) =>
    object(
        requiredLocales.reduce(
            (acc, locale) => ({
                ...acc,
                [locale]: string().required(REQUIRED_MESSAGE),
            }),
            {}
        )
    );
const locationWithOrder = () =>
    object({
        id: number().required(),
        order: number().required(),
    });

export const blackSeaSchema = (requiredLocales) =>
    object({
        black_sea_slider_title: translatable(requiredLocales),
        black_sea_slider_text: translatable(requiredLocales),
        black_sea_slider: array().of(mediaSchema()).nullable(),
        black_sea_image: number().nullable(),
        locations: array().of(locationWithOrder()),
        countriesData: array().of(
            object({
                black_sea_text: translatable(requiredLocales),
                black_sea_image: number().nullable(),
            })
        ),
    });
