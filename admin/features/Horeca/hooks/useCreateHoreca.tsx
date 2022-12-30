import { HorecaResponseEntity } from "entities/horeca";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";
import { useHorecaService } from "./useHorecaService";

export const useCreateHoreca = () => {
    const horecaService = useHorecaService();
    const navigate = useNavigate();

    const { mutate: createHoreca, isLoading } = useCreate<HorecaResponseEntity>(
        async (values) => {
            const { translations } = values;

            const payload = {
                ...values,
                translations: toTranslationsWithLocaleId(translations),
            };

            return await horecaService?.createHoreca(payload);
        },
        {
            onSuccess: (data: HorecaResponseEntity) => {
                createSuccessNotification({
                    title: "Horeca successfully created",
                });
                navigate(`/horecas/${data.id}`, { replace: true });
            },
        }
    );

    return { createHoreca, isLoading };
};
