import { useMutation } from "react-query";
import { useEventsService } from "./useEventService";

export const useDeleteEvents = (onSuccess: () => void) => {
    const eventsService = useEventsService();

    const deleteMutation = useMutation(
        (id: number) => eventsService.deleteEvent(id),
        { onSuccess }
    );

    return deleteMutation;
};
