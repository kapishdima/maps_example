import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { HorecaResponseEntity } from "entities/horeca";
import { createSuccessNotification } from "shared/ui";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";

type UpdateFunction = (
    id: string,
    horeca: HorecaResponseEntity
) => Promise<void>;

export const useUpdateHoreca = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (horeca: HorecaResponseEntity) =>
            update(id, {
                ...horeca,
                translations: toTranslationsWithLocaleId(horeca.translations),
            }),
        {
            onSuccess: () => {
                onSuccess(),
                    createSuccessNotification({
                        title: "Horeca successfully updated",
                    });
            },
        }
    );
};
