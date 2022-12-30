import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { GrapeResponseEntity } from "entities/grapes";
import { createSuccessNotification } from "shared/ui";
import { TranslationsService } from "processes/translations";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";

type UpdateFunction = (id: string, grape: GrapeResponseEntity) => Promise<void>;

export const useUpdateGrape = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (grape: GrapeResponseEntity) => {
            const { translations } = grape;

            return update(id, {
                ...grape,
                translations: toTranslationsWithLocaleId(translations),
            });
        },
        {
            onSuccess: () => {
                onSuccess(),
                    createSuccessNotification({
                        title: "Grape variety successfully updated",
                    });
            },
        }
    );
};
