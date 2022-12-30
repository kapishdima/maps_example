import { toTypeOfBussinessDomainEntity } from "entities/common-data";
import { ITypeOfBusinessAPI } from "../api/type-of-business.api";
import { ITypeOfBusinessStore } from "../store/type-of-business.store";

export class TypeOfBusinessService {
    constructor(
        private readonly typeOfBusinessApi: ITypeOfBusinessAPI,
        private readonly typeOfBusinessStore: ITypeOfBusinessStore
    ) {}

    async fetchAndSaveTypeOfBusiness() {
        const typeOfBusinessFromStore =
            this.typeOfBusinessStore.getAllTypeOfBusiness();

        if (typeOfBusinessFromStore) {
            return { typeOfBusiness: typeOfBusinessFromStore };
        }

        const typeOfBusinessFromApi =
            await this.typeOfBusinessApi.getTypeOfBusiness();
        const typeOfBusiness = this.typeOfBusinessStore.saveTypeOfBusinesss(
            typeOfBusinessFromApi.map(toTypeOfBussinessDomainEntity)
        );

        return { typeOfBusiness };
    }

    clearTypeOfBussiness() {
        this.typeOfBusinessStore.clear();
    }
}
