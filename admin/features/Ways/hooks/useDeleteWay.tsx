import { useMutation } from "react-query";
import { useWaysService } from "processes/ways";

export const useDeleteWay = (onSuccess: () => void) => {
    const wayService = useWaysService();

    const deleteMutation = useMutation(
        (id: number) => wayService.deleteWay(id),
        { onSuccess }
    );

    return deleteMutation;
};
