import { CountryDomainEntity } from "entities/countries";

export type RegionDomainEntity = {
    id: number;
    name: string;
    country: CountryDomainEntity;
};
