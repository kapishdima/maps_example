import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { AgencyResponseEntity } from "entities/agencies";
import { createSuccessNotification } from "shared/ui";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";

type UpdateFunction = (
    id: string,
    agency: AgencyResponseEntity
) => Promise<void>;

export const useUpdateAgency = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (agency: AgencyResponseEntity) => {
            return update(id, {
                ...agency,
                translations: toTranslationsWithLocaleId(agency.translations),
            });
        },
        {
            onSuccess: () => {
                onSuccess(),
                    createSuccessNotification({
                        title: "Travel angecy successfully updated",
                    });
            },
        }
    );
};
