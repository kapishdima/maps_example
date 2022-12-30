import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { AdminResponseEntity } from "entities/admins";

type UpdateFunction = (id: string, admin: AdminResponseEntity) => Promise<void>;

export const useUpdateAdmin = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation((admin: AdminResponseEntity) => update(id, admin), {
        onSuccess,
    });
};
