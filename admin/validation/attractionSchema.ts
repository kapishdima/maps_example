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

export const attractionSchema = (requiredLocales, isSuperAdmin = false) =>
    object({
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
        country_id: isSuperAdmin
            ? number().required(REQUIRED_MESSAGE)
            : number().nullable(),
        youtube: string().nullable(),
        location: locationSchema(requiredLocales, isSuperAdmin),
        contacts: array().of(contactPersonSchema(requiredLocales)).nullable(),
        media: array().of(mediaSchema()).nullable(),
    });
