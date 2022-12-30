import { CountryDomainEntity } from "entities/countries";
import { StatusTypes } from "shared/ui";

export type HorecaDomainEntity = {
    id: number;
    name: string;
    country: CountryDomainEntity;
    status: StatusTypes;
    createdAt: string;
};
