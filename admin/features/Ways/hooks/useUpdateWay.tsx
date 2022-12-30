import { LocationViewEntity } from "entities/location";
import { WayRequestEntity } from "entities/ways";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { createSuccessNotification } from "shared/ui";

type UpdateFunction = (id: string, way: WayRequestEntity) => Promise<void>;

export const useUpdateWay = (update: UpdateFunction, onSuccess: () => void) => {
    const { id } = useParams<{ id: string }>();

    return useMutation(
        (way: WayRequestEntity<LocationViewEntity[]>) => {
            const payload: WayRequestEntity = {
                ...way,
                translations: toTranslationsWithLocaleId(way.translations),
                locations: way.locations.map((location) => ({
                    id: location.id,
                    order: location.order,
                    include: location.include,
                })),
            };
            return update(id, payload);
        },
        {
            onSuccess: () => {
                onSuccess(),
                    createSuccessNotification({
                        title: "Way successfully updated",
                    });
            },
        }
    );
};
