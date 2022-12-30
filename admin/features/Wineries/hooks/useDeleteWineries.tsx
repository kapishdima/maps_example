import { useMutation } from "react-query";
import { useWineriesService } from "./useWineriesService";

export const useDeleteWineries = (onSuccess: () => void) => {
    const wineriesService = useWineriesService();

    const deleteMutation = useMutation(
        (id: number) => wineriesService.deleteWinery(id),
        { onSuccess }
    );

    return deleteMutation;
};
