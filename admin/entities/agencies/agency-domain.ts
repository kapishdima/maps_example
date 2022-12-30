import { CountryDomainEntity } from "entities/countries";
import { StatusTypes } from "shared/ui";

export type AgencyDomainEntity = {
    id: number;
    name: string;
    country: CountryDomainEntity;
    status: StatusTypes;
    createdAt: string;
};
