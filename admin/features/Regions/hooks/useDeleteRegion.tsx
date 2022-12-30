import { useMutation } from "react-query";
import { useRegionsService } from "./useRegionsService";

export const useDeleteRegion = (onSuccess: () => void) => {
    const regionsService = useRegionsService();

    const deleteMutation = useMutation(
        (id: number) => regionsService.deleteRegion(id),
        { onSuccess }
    );

    return deleteMutation;
};
