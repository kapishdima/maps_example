import { object, string, number, date, array } from "yup";
import {
    REQUIRED_MESSAGE,
    EMAIL_MESSAGE,
    MUST_BE_NUMBER,
    MUST_BE_STRING,
} from "./messages";
import { mediaSchema } from "./mediaSchema";

export const grapeSchema = (requiredLocales) =>
    object({
        translations: object(
            requiredLocales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: object({
                        name: string(),
                        taste: string().nullable(),
                        aroma: string().nullable(),
                        type: string().nullable(),
                        color: string().nullable(),
                        description: string().nullable(),
                    }),
                }),
                {}
            )
        ),
        media_id: number().required(REQUIRED_MESSAGE),
        media: array().of(mediaSchema()).nullable(),
    });
