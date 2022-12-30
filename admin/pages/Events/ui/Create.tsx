import React from "react";

import { EventsServiceProvider, EventCreateContent } from "features/Events";

export const EventCreatePage: React.FC = () => {
    return (
        <EventsServiceProvider>
            <EventCreateContent />
        </EventsServiceProvider>
    );
};
