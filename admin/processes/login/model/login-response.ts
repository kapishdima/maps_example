import { UserResponseEntity } from "entities/user";

export type LoginResponse = {
    admin: UserResponseEntity;
    token: string;
};
