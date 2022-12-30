import React from "react";

import { Content, ContentHeader } from "shared/ui";

import { EventForm } from "./Form/EventForm";
import { useCreateEvent } from "../hooks/useCreateEvent";

export const EventCreateContent: React.FC = () => {
    const { createEvent, isLoading } = useCreateEvent();

    return (
        <Content header={<ContentHeader title="Create an event" hasBackLink />}>
            <EventForm onSubmit={createEvent} isLoading={isLoading} />
        </Content>
    );
};
