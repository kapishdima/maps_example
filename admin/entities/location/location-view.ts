import { CountryDomainEntity } from "entities/countries";
import { RegionDomainEntity } from "entities/region";
import { LocationAdress } from "./location-response";

export type LocationEntityTypes = "attractions" | "horecas" | "wineries";

export type LocationViewEntity = {
    id: number;
    name: string;
    country: CountryDomainEntity;
    address: LocationAdress | string;
    lat: string;
    lng: string;
    plusCode: string;
    type: LocationEntityTypes;
    include?: boolean;
    order?: number;
};
