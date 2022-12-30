import { object, string, number, date, array } from "yup";
import { REQUIRED_MESSAGE } from "./messages";

export const locationSchema = (requiredLocales, isSuperAdmin = false) =>
    object({
        address: object(
            requiredLocales.reduce(
                (acc, locale) => ({
                    ...acc,
                    [locale]: string().required("Adress must be filled"),
                }),
                {}
            )
        ),
        country_id: isSuperAdmin
            ? number().required(REQUIRED_MESSAGE)
            : number().nullable(),
        lat: string().required("Lattitude is a required field"),
        lng: string().required("Longitude is a required field"),
        plus_code: string().nullable(),
        region_id: string().required("Region must be selected"),
    });
