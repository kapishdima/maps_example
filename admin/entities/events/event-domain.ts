import { CountryDomainEntity } from "entities/countries";
import { StatusTypes } from "shared/ui";

export type EventDomainEntity = {
    id: number;
    name: string;
    month: number;
    country: CountryDomainEntity;
    status: StatusTypes;
    createdAt: string;
};
