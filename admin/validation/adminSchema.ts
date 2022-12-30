import { object, string, number, date, array, boolean, ref } from "yup";
import { locationSchema } from "./locationSchema";
import { contactPersonSchema } from "./contactPersonSchema";
import {
    REQUIRED_MESSAGE,
    EMAIL_MESSAGE,
    MUST_BE_NUMBER,
    MUST_BE_STRING,
} from "./messages";
import { mediaSchema } from "./mediaSchema";

export const adminSchema = (requiredLocales) =>
    object({
        country_id: number().required(REQUIRED_MESSAGE),
        name: string().required(REQUIRED_MESSAGE),
        email: string().required(REQUIRED_MESSAGE),
        password: string().required(REQUIRED_MESSAGE),
        password_confirmation: string().oneOf(
            [ref("password"), null],
            "Passwords must match"
        ),
        isSuperAdmin: boolean().required(REQUIRED_MESSAGE),
    });
