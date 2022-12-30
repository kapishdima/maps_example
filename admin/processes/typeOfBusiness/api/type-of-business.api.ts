import { TypeOfBusinessResponseEntity } from "entities/common-data";
import { IAPIClient } from "shared/api";

export interface ITypeOfBusinessAPI {
    getTypeOfBusiness: () => Promise<TypeOfBusinessResponseEntity[]>;
}

export class TypeOfBusinessAPI implements ITypeOfBusinessAPI {
    constructor(private readonly client: IAPIClient) {}

    public async getTypeOfBusiness(): Promise<TypeOfBusinessResponseEntity[]> {
        const { data: typeOfBussines } = await this.client.get<{
            data: TypeOfBusinessResponseEntity[];
        }>("/api/typesOfBusiness");

        return typeOfBussines.data;
    }
}
