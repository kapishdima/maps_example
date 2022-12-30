import { StaffLangsDomainEntity } from "entities/common-data";

export interface IStaffLangsStore {
    saveStaffLangs: (
        staffLangs: StaffLangsDomainEntity[]
    ) => StaffLangsDomainEntity[];
    getAllStaffLangs: () => StaffLangsDomainEntity[];
    getOneStaffLangs: (id: number) => StaffLangsDomainEntity;
    clear: () => void;
}
export class StaffLangsStore implements IStaffLangsStore {
    STAFF_LANGS_STORE_KEY = "sea_of_wine/staff_langs";

    constructor() {}

    saveStaffLangs(
        staffLangs: StaffLangsDomainEntity[]
    ): StaffLangsDomainEntity[] {
        localStorage.setItem(
            this.STAFF_LANGS_STORE_KEY,
            JSON.stringify(staffLangs)
        );

        return this.getAllStaffLangs();
    }

    getAllStaffLangs(): StaffLangsDomainEntity[] {
        return JSON.parse(localStorage.getItem(this.STAFF_LANGS_STORE_KEY));
    }
    getOneStaffLangs(id: number): StaffLangsDomainEntity {
        const staffLangsFromStore = this.getAllStaffLangs();

        if (!staffLangsFromStore) {
            return;
        }

        return staffLangsFromStore.find((staffLangs) => staffLangs.id === id);
    }

    clear() {
        localStorage.removeItem(this.STAFF_LANGS_STORE_KEY);
    }
}
