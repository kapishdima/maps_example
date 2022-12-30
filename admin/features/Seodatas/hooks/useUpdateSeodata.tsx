import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { SeodataResponseEntity } from "entities/seodatas";

type UpdateFunction = (
    id: string,
    seodata: SeodataResponseEntity
) => Promise<void>;

export const useUpdateSeodata = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (seodata: SeodataResponseEntity) => update(id, seodata),
        {
            onSuccess,
        }
    );
};
