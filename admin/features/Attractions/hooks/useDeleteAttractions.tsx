import { useMutation } from "react-query";
import { useAttractionsService } from "./useAttractionsService";

export const useDeleteAttractions = (onSuccess: () => void) => {
    const attractionsService = useAttractionsService();

    const deleteMutation = useMutation(
        (id: number) => attractionsService.deleteAttraction(id),
        { onSuccess }
    );

    return deleteMutation;
};
