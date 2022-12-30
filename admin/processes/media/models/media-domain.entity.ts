import { UserDomainEntity } from "entities/user";
import { CountryDomainEntity } from "entities/countries";

export type MediaDomainEnity = {
    id: number;
    country: CountryDomainEntity;
    owner: UserDomainEntity;
    compressedPath: string;
    path: string;
};

export type MediaResponseEntity = {
    id: number;
    order?: number;
};

export type MediaResponseWithOrderEntity = {
    id: number;
    order?: number;
    url: string;
};

export type MediaWithOrder = {
    media: MediaDomainEnity;
    order?: number;
};
