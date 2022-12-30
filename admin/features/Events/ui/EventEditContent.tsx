import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { EventResponseEntity } from "entities/events";

import { EventForm } from "./Form/EventForm";
import { useEventsService } from "../hooks/useEventService";
import { EventHeading } from "./Form/EventHeading";
import { useUpdateEvent } from "../hooks/useUpdateEvent";

export const EventEditContent: React.FC = () => {
    const eventsService = useEventsService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: event, isFetching } = useGetResourceById(
        "event",
        (id: string) => eventsService.getEvent(id)
    );
    const { mutate: updateEvent, isLoading } = useUpdateEvent(
        (id: string, event: EventResponseEntity) =>
            eventsService.updateEvent(id, event),
        onUpdateSuccess
    );

    if (isFetching) {
        return <Loading minWidth="100vw" minHeight="100vh" />;
    }

    return (
        <Content
            header={
                <ContentHeader
                    title={
                        <Pane display="flex" alignItems="center">
                            <EventHeading event={event} />
                            <InlineStatus
                                status={{
                                    value: event.status,
                                    label: event.status,
                                }}
                            />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <EventForm
                onSubmit={updateEvent}
                defaultValue={event}
                isLoading={isLoading}
            />
        </Content>
    );
};
