import { useAxiosClient } from "app/hooks";

import { StaffLangsAPI } from "../api/staff-langs.api";
import { StaffLangsService } from "../service/staff-langs.service";
import { StaffLangsStore } from "../store/staff-langs.store";

export const useStaffLangs = () => {
    const axiosClient = useAxiosClient();
    const staffLangsService = new StaffLangsService(
        new StaffLangsAPI(axiosClient),
        new StaffLangsStore()
    );

    const fetchAndSaveStaffLangs = async () => {
        const { staffLangs } = await staffLangsService.fetchAndSaveStaffLangs();

        return { staffLangs };
    };

    const clearStaffLangs = () => {
        staffLangsService.clearStaffLangs();
    };

    return { fetchAndSaveStaffLangs, clearStaffLangs };
};
