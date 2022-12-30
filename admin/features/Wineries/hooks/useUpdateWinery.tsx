import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { WineryRequestEntity, WineryResponseEntity } from "entities/winery";
import { createSuccessNotification } from "shared/ui";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";

type UpdateFunction = (
    id: string,
    winery: WineryRequestEntity
) => Promise<void>;

export const useUpdateWinery = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (winery: WineryRequestEntity) =>
            update(id, {
                ...winery,
                translations: toTranslationsWithLocaleId(winery.translations),
            }),
        {
            onSuccess: () => {
                onSuccess(),
                    createSuccessNotification({
                        title: "Winery successfully updated",
                    });
            },
        }
    );
};
