import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { AttractionResponseEntity } from "entities/attractions";
import { createSuccessNotification } from "shared/ui";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";

type UpdateFunction = (
    id: string,
    attraction: AttractionResponseEntity
) => Promise<void>;

export const useUpdateAttraction = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (attraction: AttractionResponseEntity) => {
            return update(id, {
                ...attraction,
                translations: toTranslationsWithLocaleId(
                    attraction.translations
                ),
            });
        },
        {
            onSuccess: () => {
                onSuccess(),
                    createSuccessNotification({
                        title: "Attraction successfully updated",
                    });
            },
        }
    );
};
