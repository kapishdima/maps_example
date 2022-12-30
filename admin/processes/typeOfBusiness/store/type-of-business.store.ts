import { TypeOfBusinessDomainEntity } from "entities/common-data";

export interface ITypeOfBusinessStore {
    saveTypeOfBusinesss: (
        tourOptions: TypeOfBusinessDomainEntity[]
    ) => TypeOfBusinessDomainEntity[];
    getAllTypeOfBusiness: () => TypeOfBusinessDomainEntity[];
    getOneTypeOfBusiness: (id: number) => TypeOfBusinessDomainEntity;
    clear: () => void;
}
export class TypeOfBusinessStore implements ITypeOfBusinessStore {
    TYPE_OF_BUSINESS_STORE_KEY = "sea_of_wine/type_of_business";

    constructor() {}

    saveTypeOfBusinesss(
        tourOptions: TypeOfBusinessDomainEntity[]
    ): TypeOfBusinessDomainEntity[] {
        localStorage.setItem(
            this.TYPE_OF_BUSINESS_STORE_KEY,
            JSON.stringify(tourOptions)
        );

        return this.getAllTypeOfBusiness();
    }

    getAllTypeOfBusiness(): TypeOfBusinessDomainEntity[] {
        return JSON.parse(
            localStorage.getItem(this.TYPE_OF_BUSINESS_STORE_KEY)
        );
    }
    getOneTypeOfBusiness(id: number): TypeOfBusinessDomainEntity {
        const typeOfBusinessFromStore = this.getAllTypeOfBusiness();

        if (!typeOfBusinessFromStore) {
            return;
        }

        return typeOfBusinessFromStore.find(
            (typeOfBusiness) => typeOfBusiness.id === id
        );
    }

    clear() {
        localStorage.removeItem(this.TYPE_OF_BUSINESS_STORE_KEY);
    }
}
