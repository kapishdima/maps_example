export type UserDomainEntity = {
    id: number;
    countryId: number;
    name: string;
    email: string;
    role: "admin" | "superadmin";
};
