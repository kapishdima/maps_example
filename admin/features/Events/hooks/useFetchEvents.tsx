import { EventDomainEntity } from "entities/events";
import { useList } from "shared/hooks";
import { useEventsService } from "./useEventService";

export const useFetchEvents = () => {
    const eventsService = useEventsService();

    const {
        applyFilters,
        pagination,
        data: events,
        isFetching,
        refetch,
    } = useList<EventDomainEntity[]>("events", ({ page, size, filters }) =>
        eventsService.fetchEvents({
            page,
            size,
            filters,
        })
    );

    return {
        applyFilters,
        pagination,
        events,
        isFetching,
        refetch,
    };
};
