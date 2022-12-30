import React from "react";
import { useDeleteEvents } from "../hooks/useDeleteEvents";
import { useFetchEvents } from "../hooks/useFetchEvents";

import { EventsFilters } from "./EventsFilters";
import { EventsTable } from "./EventsTable";

export const EventsViewContent: React.FC = () => {
    const { events, isFetching, applyFilters, refetch } = useFetchEvents();
    const deleteMutation = useDeleteEvents(refetch);

    return (
        <>
            <EventsFilters applyFilters={applyFilters} />
            <EventsTable
                events={events}
                isFetching={isFetching}
                onDeleteEvent={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
