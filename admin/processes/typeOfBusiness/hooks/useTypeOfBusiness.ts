import { useAxiosClient } from "app/hooks";

import { TypeOfBusinessAPI } from "../api/type-of-business.api";
import { TypeOfBusinessService } from "../service/type-of-business.service";
import { TypeOfBusinessStore } from "../store/type-of-business.store";

export const useTypeOfBusiness = () => {
    const axiosClient = useAxiosClient();
    const typeOfBusinessService = new TypeOfBusinessService(
        new TypeOfBusinessAPI(axiosClient),
        new TypeOfBusinessStore()
    );

    const fetchAndSaveTypeOfBusiness = async () => {
        const { typeOfBusiness } =
            await typeOfBusinessService.fetchAndSaveTypeOfBusiness();

        return { typeOfBusiness };
    };

    const clearTypeOfBussiness = () => {
        typeOfBusinessService.clearTypeOfBussiness();
    };

    return { fetchAndSaveTypeOfBusiness, clearTypeOfBussiness };
};
