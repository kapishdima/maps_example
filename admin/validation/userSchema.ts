import { object, string, number, date } from "yup";

const REQUIRED_MESSAGE = "Field is required!";
const EMAIL_MESSAGE = "Invalid email";
const URL_MESSAGE = "Invalid url";
const PHONE_MESSAGE = "Invalid phone";

export const userSchema = object({
    name: string().required(REQUIRED_MESSAGE),
    username: string().required(REQUIRED_MESSAGE),
    email: string().email(EMAIL_MESSAGE).required(REQUIRED_MESSAGE),
    website: string().url(URL_MESSAGE).required(REQUIRED_MESSAGE),
    phone: string()
        .matches(/[0-9]/gi, PHONE_MESSAGE)
        .required(REQUIRED_MESSAGE),
});
