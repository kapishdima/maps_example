import { CountryDomainEntity } from "entities/countries";

export type AdminDomainEntity = {
    id: number;
    name: string;
    email: string;
    country: CountryDomainEntity;
    createdAt: string;
};
