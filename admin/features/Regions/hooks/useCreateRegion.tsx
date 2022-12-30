import { RegionResponseEntity } from "entities/region";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";

import { useRegionsService } from "./useRegionsService";

export const useCreateRegion = () => {
    const regionsService = useRegionsService();
    const navigate = useNavigate();

    const { mutate: createRegion, isLoading } = useCreate<RegionResponseEntity>(
        async (region: RegionResponseEntity) => {
            return await regionsService?.createRegion({
                ...region,
                translations: toTranslationsWithLocaleId(region.translations),
            });
        },
        {
            onSuccess: (data: RegionResponseEntity) => {
                createSuccessNotification({
                    title: "Region successfully created",
                });
                navigate(`/regions/${data.id}`, { replace: true });
            },
        }
    );

    return { createRegion, isLoading };
};
