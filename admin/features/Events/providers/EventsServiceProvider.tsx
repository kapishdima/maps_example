import React from "react";
import { EventsAPI, EventService } from "processes/events";
import { useAxiosClient } from "app/hooks";

export const EventServiceContext = React.createContext<EventService>(null);

export const EventsServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const eventsService = new EventService(new EventsAPI(axiosClient));

    return (
        <EventServiceContext.Provider value={eventsService}>
            {children}
        </EventServiceContext.Provider>
    );
};
