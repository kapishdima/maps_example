import { useMutation } from "react-query";
import { useGrapesService } from "./useGrapesService";

export const useDeleteGrapes = (onSuccess: () => void) => {
    const grapesService = useGrapesService();

    const deleteMutation = useMutation(
        (id: number) => grapesService.deleteGrape(id),
        { onSuccess }
    );

    return deleteMutation;
};
