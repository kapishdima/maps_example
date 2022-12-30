import { WineryRequestEntity } from "entities/winery";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";
import { useWineriesService } from "./useWineriesService";

export const useCreateWinery = () => {
    const wineriesService = useWineriesService();
    const navigate = useNavigate();

    const { mutate: createWinery, isLoading } = useCreate<WineryRequestEntity>(
        async (values) => {
            const { translations } = values;

            const payload = {
                ...values,
                translations: toTranslationsWithLocaleId(translations),
            };

            return await wineriesService?.createWinery(payload);
        },
        {
            onSuccess: (data: WineryRequestEntity) => {
                createSuccessNotification({
                    title: "Winery successfully created",
                });

                navigate(`/wineries/${data.id}`, { replace: true });
            },
        }
    );

    return { createWinery, isLoading };
};
