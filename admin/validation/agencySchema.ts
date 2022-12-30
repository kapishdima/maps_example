import { object, string, number, date, array } from "yup";
import { locationSchema } from "./locationSchema";
import { contactPersonSchema } from "./contactPersonSchema";
import {
    REQUIRED_MESSAGE,
    EMAIL_MESSAGE,
    MUST_BE_NUMBER,
    MUST_BE_STRING,
} from "./messages";

export const agencySchema = (requiredLocales, isSuperAdmin = false) =>
    object({
        translations: object(
            requiredLocales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: object({
                        name: string().required(REQUIRED_MESSAGE),
                        contact_person: string().nullable(),
                        address: string().nullable(),
                        region: string().nullable(),
                        description: string().nullable(),
                    }),
                }),
                {}
            )
        ),
        country_id: isSuperAdmin
            ? number().required(REQUIRED_MESSAGE)
            : number().nullable(),
        media_id: number().required(REQUIRED_MESSAGE),
        email: string().email(),
        telephone: string(),
        website: string(),
    });
