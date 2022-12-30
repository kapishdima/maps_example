export enum AuthStatusTypes {
    AUTHORIZED = "AUTHORIZED",
    UNAUTHORIZED = "UNAUTHORIZED",
}

export const isAuthorized = (status: AuthStatusTypes) =>
    status === AuthStatusTypes.AUTHORIZED;

export const isUnauthorized = (status: AuthStatusTypes) =>
    status === AuthStatusTypes.UNAUTHORIZED;
