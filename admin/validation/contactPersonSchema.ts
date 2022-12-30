import { REQUIRED_MESSAGE } from "./messages";
import { object, string, number, date, array } from "yup";

export const contactPersonSchema = (requiredLocales) =>
    object({
        contact_person: object(
            requiredLocales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: string().nullable(),
                }),
                {}
            )
        ).nullable(),
        email: string().nullable(),
        telephone: string().nullable(),
        website: string().nullable(),
    });
