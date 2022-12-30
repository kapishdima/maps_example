import { useMutation } from "react-query";
import { useSeodatasService } from "./useSeodatasService";

export const useDeleteSeodatas = (onSuccess: () => void) => {
    const seodatasService = useSeodatasService();

    const deleteMutation = useMutation(
        (id: number) => seodatasService.deleteSeodata(id),
        { onSuccess }
    );

    return deleteMutation;
};
