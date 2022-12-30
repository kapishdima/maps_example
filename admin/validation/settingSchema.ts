import { object, string, number, date, array } from "yup";
import {
    REQUIRED_MESSAGE,
    EMAIL_MESSAGE,
    MUST_BE_NUMBER,
    MUST_BE_STRING,
} from "./messages";
import { mediaSchema } from "./mediaSchema";

const translatable = (requiredLocales) =>
    object(
        requiredLocales.reduce(
            (acc, locale) => ({
                ...acc,
                [locale]: string().required(REQUIRED_MESSAGE),
            }),
            {}
        )
    );

export const settingSchema = (requiredLocales) =>
    object({
        head_html: string(),
        after_body_start_html: string().nullable(),
        before_body_end_html: string().nullable(),
        main_block1_text1: translatable(requiredLocales),
        main_block1_text2: translatable(requiredLocales),
        main_exp_title: translatable(requiredLocales),
        main_exp_text1: translatable(requiredLocales),
        main_exp_text2: translatable(requiredLocales),
        main_expertise_title: translatable(requiredLocales),
        main_expertise_text: translatable(requiredLocales),
        main_black_title: translatable(requiredLocales),
        main_black_point1_title: translatable(requiredLocales),
        main_black_point1_text: translatable(requiredLocales),
        main_black_point2_title: translatable(requiredLocales),
        main_black_point2_text: translatable(requiredLocales),
        main_black_point3_title: translatable(requiredLocales),
        main_black_point3_text: translatable(requiredLocales),
        main_black_button_text: translatable(requiredLocales),
        main_partner_title: translatable(requiredLocales),
        main_partner_text: translatable(requiredLocales),
        facebook_url: string().nullable(),
        instagram_url: string().nullable(),
        footer_text: translatable(requiredLocales),
        blog_main_image: number().nullable(),
        media: array().of(mediaSchema()).nullable(),
    });
