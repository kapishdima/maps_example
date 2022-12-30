import { useMutation } from "react-query";
import { useAdminsService } from "./useAdminsService";

export const useDeleteAdmins = (onSuccess: () => void) => {
    const adminsService = useAdminsService();

    const deleteMutation = useMutation(
        (id: number) => adminsService.deleteAdmin(id),
        {
            onSuccess,
        }
    );

    return deleteMutation;
};
