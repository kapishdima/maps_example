import { object, string, number, date, array } from "yup";

import { contactPersonSchema } from "./contactPersonSchema";
import {
    REQUIRED_MESSAGE,
    EMAIL_MESSAGE,
    MUST_BE_NUMBER,
    MUST_BE_STRING,
} from "./messages";
import { mediaSchema } from "./mediaSchema";

const locationWithOrder = () =>
    object({
        id: number().required(),
        order: number().required(),
    });

export const waySchema = (requiredLocales, isSuperAdmin = false) =>
    object({
        translations: object(
            requiredLocales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: object({
                        name: string().required(REQUIRED_MESSAGE),
                        text: string().required(REQUIRED_MESSAGE),
                        middle_text: string().nullable(),
                        middle_title: string().nullable(),
                    }),
                }),
                {}
            )
        ),
        country_id: isSuperAdmin
            ? number().required(REQUIRED_MESSAGE)
            : number().nullable(),
        location: array().of(locationWithOrder()),
        gallery: array().of(mediaSchema()).nullable(),
        media: array().of(mediaSchema()).nullable(),
        image_id: number().nullable(),
        thumbnail_id: number().nullable(),
    });
