import { useAxiosClient } from "app/hooks";

import { PayingPossibilitiesAPI } from "../api/paying-possibilities.api";
import { PayingPossibilitiesService } from "../service/paying-possibilities.service";
import { PayingPossibilitiesStore } from "../store/paying-possibilities.store";

export const usePayingPossibilities = () => {
    const axiosClient = useAxiosClient();
    const payingPossibilitiesService = new PayingPossibilitiesService(
        new PayingPossibilitiesAPI(axiosClient),
        new PayingPossibilitiesStore()
    );

    const fetchAndSavePayingPossibilities = async () => {
        const { payingPossibilities } =
            await payingPossibilitiesService.fetchAndSavePayingPossibilities();

        return { payingPossibilities };
    };

    const clearPayingPossibilities = () => {
        payingPossibilitiesService.clearPayingPossibilities();
    };

    return { fetchAndSavePayingPossibilities, clearPayingPossibilities };
};
