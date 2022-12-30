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

export const horecaSchema = (requiredLocales, isSuperAdmin = false) =>
    object({
        type: string().required(),
        translations: object(
            requiredLocales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: object({
                        name: string().required(REQUIRED_MESSAGE),
                        description: string().required(REQUIRED_MESSAGE),
                        types_of_events: string().nullable(),
                    }),
                }),
                {}
            )
        ),
        country_id: isSuperAdmin
            ? number().required(REQUIRED_MESSAGE)
            : number().nullable(),
        location: locationSchema(requiredLocales, isSuperAdmin),
        contacts: array().of(contactPersonSchema(requiredLocales)),
        media: array().of(mediaSchema()).nullable(),
    });
