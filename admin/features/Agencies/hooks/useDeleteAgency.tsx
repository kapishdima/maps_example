import { useMutation } from "react-query";
import { useAgenciesService } from "./useAgenciesService";

export const useDeleteAgencies = (onSuccess: () => void) => {
    const agenciesService = useAgenciesService();

    const deleteMutation = useMutation(
        (id: number) => agenciesService.deleteAgency(id),
        { onSuccess }
    );

    return deleteMutation;
};
