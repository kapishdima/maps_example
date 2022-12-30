import { UserResponseEntity } from "entities/user";
import { AuthStatusTypes } from "./auth-status";

export type AuthResponse = {
    status: AuthStatusTypes;
    user: UserResponseEntity;
};
