import { object, string, number, date } from "yup";

const REQUIRED_MESSAGE = "Field is required!";
const EMAIL_MESSAGE = "Invalid email";

export const loginSchema = object({
    email: string().email(EMAIL_MESSAGE).required(REQUIRED_MESSAGE),
    password: string().required(REQUIRED_MESSAGE),
});
