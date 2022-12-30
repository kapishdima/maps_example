import { StatusTypes } from "shared/ui";

export type GrapeDomainEntity = {
    id: number;
    name: string;
    status: StatusTypes;
    createdAt: string;
};
