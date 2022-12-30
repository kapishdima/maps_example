import { AdminResponseEntity } from "entities/admins";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";
import { useAdminsService } from "./useAdminsService";

export const useCreateAdmin = () => {
    const adminService = useAdminsService();
    const navigate = useNavigate();

    const { mutate: createAdmin, isLoading } = useCreate<AdminResponseEntity>(
        async (values) => {
            return await adminService?.createAdmin(values);
        },
        {
            onSuccess: (data: AdminResponseEntity) => {
                createSuccessNotification({
                    title: "Admin successfully created",
                });

                navigate(`/admins/${data.id}`, { replace: true });
            },
        }
    );

    return { createAdmin, isLoading };
};
