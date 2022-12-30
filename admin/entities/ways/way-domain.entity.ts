import { CountryDomainEntity } from "entities/countries";
import { LocationResponseWithoutDetails } from "entities/location";

import { MediaWithOrder } from "processes/media";
import { StatusTypes } from "shared/ui";

export type WayDomainEntity = {
    id: number;
    country: CountryDomainEntity;
    status: StatusTypes;
    name: string;
    text: string;
    locations: LocationResponseWithoutDetails[];
    media: MediaWithOrder[];
};

export type WayTranslations = {
    name: string;
    text: string;
};
