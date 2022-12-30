import React from "react";

import { EventsServiceProvider, EventEditContent } from "features/Events";

export const EventEditPage: React.FC = () => {
    return (
        <EventsServiceProvider>
            <EventEditContent />
        </EventsServiceProvider>
    );
};
