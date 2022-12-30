import { EventResponseEntity } from "entities/events";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";
import { useEventsService } from "./useEventService";

export const useCreateEvent = () => {
    const eventService = useEventsService();
    const navigate = useNavigate();

    const { mutate: createEvent, isLoading } = useCreate<EventResponseEntity>(
        async (values) => {
            const { translations } = values;

            const payload = {
                ...values,
                translations: toTranslationsWithLocaleId(translations),
            };

            return await eventService?.createEvent(payload);
        },
        {
            onSuccess: (data: EventResponseEntity) => {
                createSuccessNotification({
                    title: "Event successfully created",
                });
                navigate(`/events/${data.id}`, { replace: true });
            },
        }
    );

    return { createEvent, isLoading };
};
