import { AttractionResponseEntity } from "entities/attractions";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";
import { useAttractionsService } from "./useAttractionsService";

export const useCreateAttraction = () => {
    const wineriesService = useAttractionsService();

    const navigate = useNavigate();

    const { mutate: createAttraction, isLoading } =
        useCreate<AttractionResponseEntity>(
            async (values) => {
                const { translations } = values;

                const payload = {
                    ...values,
                    translations: toTranslationsWithLocaleId(translations),
                };

                return await wineriesService?.createAttraction(payload);
            },
            {
                onSuccess: (data: AttractionResponseEntity) => {
                    createSuccessNotification({
                        title: "Attraction successfully created",
                    });
                    navigate(`/attractions/${data.id}`, { replace: true });
                },
            }
        );

    return { createAttraction, isLoading };
};
