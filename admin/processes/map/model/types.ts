import { LocationViewEntity } from "entities/location";

export type Center = {
    lat: number;
    lng: number;
};

export type CreateDirectionFunction = (chunk: LocationViewEntity[]) => void;

export type MapOptions = {
    country: string;
};
