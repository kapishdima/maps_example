import { toStaffLangsDomainEntity } from "entities/common-data";
import { IStaffLangsAPI } from "../api/staff-langs.api";
import { IStaffLangsStore } from "../store/staff-langs.store";

export class StaffLangsService {
    constructor(
        private readonly staffLangsApi: IStaffLangsAPI,
        private readonly staffLangsStore: IStaffLangsStore
    ) {}

    async fetchAndSaveStaffLangs() {
        const staffLangsFromStore = this.staffLangsStore.getAllStaffLangs();

        if (staffLangsFromStore) {
            return { staffLangs: staffLangsFromStore };
        }

        const staffLangsFromApi = await this.staffLangsApi.getStaffLangs();
        const staffLangs = this.staffLangsStore.saveStaffLangs(
            staffLangsFromApi.map(toStaffLangsDomainEntity)
        );

        return { staffLangs };
    }

    clearStaffLangs() {
        this.staffLangsStore.clear();
    }
}
