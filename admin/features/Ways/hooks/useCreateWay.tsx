import { useCreate } from "shared/hooks";
import { useWaysService } from "processes/ways";
import { WayRequestEntity, WayResponseEntity } from "entities/ways";
import { useLocationsStore } from "processes/locations";
import { createSuccessNotification } from "shared/ui";
import { useNavigate } from "react-router-dom";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";

export const useCreateWay = () => {
    const wineriesService = useWaysService();
    const locationsStore = useLocationsStore();

    const navigate = useNavigate();

    const create = async (values) => {
        const { translations } = values;

        const payload = {
            ...values,
            translations: toTranslationsWithLocaleId(translations),
            locations: locationsStore.selected.map(
                ({ location, includedInRoute }, order) => ({
                    id: location.id,
                    include: includedInRoute,
                    order,
                })
            ),
        };

        return await wineriesService?.createWay(payload);
    };

    const { mutate: createWay, isLoading } = useCreate<WayRequestEntity>(
        create,
        {
            onSuccess: (data: WayResponseEntity) => {
                createSuccessNotification({
                    title: "Way successfully created",
                });
                navigate(`/ways/${data.id}`, { replace: true });
            },
        }
    );

    return { createWay, isLoading };
};
