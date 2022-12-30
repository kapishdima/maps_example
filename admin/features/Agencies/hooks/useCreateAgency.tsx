import { AgencyResponseEntity } from "entities/agencies";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";
import { useAgenciesService } from "./useAgenciesService";

export const useCreateAgency = () => {
    const wineriesService = useAgenciesService();
    const navigate = useNavigate();

    const { mutate: createAgency, isLoading } = useCreate<AgencyResponseEntity>(
        async (values) => {
            const { translations } = values;

            const payload = {
                ...values,
                translations: toTranslationsWithLocaleId(translations),
            };

            return await wineriesService?.createAgency(payload);
        },
        {
            onSuccess: (data: AgencyResponseEntity) => {
                createSuccessNotification({
                    title: "Travel agency successfully created",
                });
                navigate(`/agencies/${data.id}`, { replace: true });
            },
        }
    );

    return { createAgency, isLoading };
};
