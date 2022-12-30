import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { EventResponseEntity } from "entities/events";
import { createSuccessNotification } from "shared/ui";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";

type UpdateFunction = (id: string, event: EventResponseEntity) => Promise<void>;

export const useUpdateEvent = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (event: EventResponseEntity) => {
            return update(id, {
                ...event,
                translations: toTranslationsWithLocaleId(event.translations),
            });
        },
        {
            onSuccess: () => {
                onSuccess(),
                    createSuccessNotification({
                        title: "Event successfully updated",
                    });
            },
        }
    );
};
