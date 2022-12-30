import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { RegionResponseEntity } from "entities/region";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";

type UpdateFunction = (
    id: string,
    region: RegionResponseEntity
) => Promise<void>;

export const useUpdateRegion = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (region: RegionResponseEntity) =>
            update(id, {
                ...region,
                translations: toTranslationsWithLocaleId(region.translations),
            }),
        {
            onSuccess,
        }
    );
};
