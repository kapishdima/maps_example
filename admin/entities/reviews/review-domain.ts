import { WineryResponseEntity } from "entities/winery";
import { CountryDomainEntity } from "entities/countries";
import { StatusTypes } from "shared/ui";

export type ReviewDomainEntity = {
    id: number;
    name: string;
    status: StatusTypes;
    createdAt: string;
    winery: WineryResponseEntity;
};
