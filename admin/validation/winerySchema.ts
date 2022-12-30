import { object, string, number, date, array } from "yup";
import { locationSchema } from "./locationSchema";
import { contactPersonSchema } from "./contactPersonSchema";
import {
    REQUIRED_MESSAGE,
    EMAIL_MESSAGE,
    MUST_BE_NUMBER,
    MUST_BE_STRING,
} from "./messages";
import { mediaSchema } from "./mediaSchema";

export const winerySchema = (requiredLocales, isSuperAdmin = false) =>
    object({
        accommodation: string().nullable(),
        translations: object(
            requiredLocales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: object({
                        name: string().required(REQUIRED_MESSAGE),
                        description: string().nullable(),
                    }),
                }),
                {}
            )
        ),
        location: locationSchema(requiredLocales, isSuperAdmin),
        contacts: array().of(contactPersonSchema(requiredLocales)).nullable(),
        tour_options: array().of(number()).nullable(),
        grape_varieties: array().of(number()).nullable(),
        wine_categories: array().of(number()).nullable(),
        staff_langs: array().of(number()).nullable(),
        paying_possibilities: array().of(number()),
        type_of_businesses: array().of(string()),
        media: array().of(mediaSchema()).nullable(),
        thumbnail: number().nullable(),
        image_id: number().nullable(),
        country_id: isSuperAdmin
            ? number().required(REQUIRED_MESSAGE)
            : number().nullable(),

        // for media validation .required(REQUIRED_MESSAGE).min(1),
    });
