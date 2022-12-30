import { object, string, number, date, array } from "yup";
import {
    REQUIRED_MESSAGE,
    EMAIL_MESSAGE,
    MUST_BE_NUMBER,
    MUST_BE_STRING,
} from "./messages";
import { mediaSchema } from "./mediaSchema";

export const eventSchema = (requiredLocales, isSuperAdmin = false) =>
    object({
        translations: object(
            requiredLocales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: object({
                        name: string().required(REQUIRED_MESSAGE),
                        address: string().nullable(),
                        description: string().nullable(),
                        organized: string().nullable(),
                    }),
                }),
                {}
            )
        ),
        country_id: isSuperAdmin
            ? number().required(REQUIRED_MESSAGE)
            : number().nullable(),
        contact_person: string().nullable(),
        image_id: number().required(REQUIRED_MESSAGE),
        media: array().of(mediaSchema()).nullable(),
        region_id: number().required(REQUIRED_MESSAGE),
    });
