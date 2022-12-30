import { GrapeResponseEntity } from "entities/grapes";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";
import { useGrapesService } from "./useGrapesService";

export const useCreateGrape = () => {
    const wineriesService = useGrapesService();
    const navigate = useNavigate();

    const { mutate: createGrape, isLoading } = useCreate<GrapeResponseEntity>(
        async (values) => {
            const { translations } = values;

            const payload = {
                ...values,
                translations: toTranslationsWithLocaleId(translations),
            };

            return await wineriesService?.createGrape(payload);
        },
        {
            onSuccess: (data: GrapeResponseEntity) => {
                createSuccessNotification({
                    title: "Grape variety successfully created",
                });
                navigate(`/grapeVarieties/${data.id}`, { replace: true });
            },
        }
    );

    return { createGrape, isLoading };
};
