import { REQUIRED_MESSAGE } from "./messages";
import { object, string, number, date, array } from "yup";

export const mediaSchema = () =>
    object({
        order: number().required(REQUIRED_MESSAGE),
        id: number().required(REQUIRED_MESSAGE),
    });
