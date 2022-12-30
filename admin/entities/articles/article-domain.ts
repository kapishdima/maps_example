import { StatusTypes } from "shared/ui";

export type ArticleDomainEntity = {
    id: number;
    title: string;
    status: StatusTypes;
    createdAt: string;
};
