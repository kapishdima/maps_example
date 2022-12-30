import { useMutation } from "react-query";
import { useHorecaService } from "./useHorecaService";

export const useDeleteHoreca = (onSuccess: () => void) => {
    const horecaService = useHorecaService();

    const deleteMutation = useMutation(
        (id: number) => horecaService.deleteHoreca(id),
        { onSuccess }
    );

    return deleteMutation;
};
