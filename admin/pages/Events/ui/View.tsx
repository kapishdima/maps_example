import React from "react";

import { Pane } from "evergreen-ui";

import { EventsViewContent, EventsServiceProvider } from "features/Events";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const EventsViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Events Page"
                    hint="On this page you can see all information about wineries in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create one" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <EventsServiceProvider>
                <EventsViewContent />
            </EventsServiceProvider>
        </Content>
    );
};
