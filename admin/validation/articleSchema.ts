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

export const articleSchema = (requiredLocales) =>
    object({
        thumbnail_id: number().required(REQUIRED_MESSAGE),
        title: string().required(REQUIRED_MESSAGE),
    });
