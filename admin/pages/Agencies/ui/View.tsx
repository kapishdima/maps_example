import React from "react";

import { Pane } from "evergreen-ui";

import {
    AgenciesViewContent,
    AgenciesServiceProvider,
} from "features/Agencies";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const AgenciesViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Agencies Page"
                    hint="On this page you can see all information about wineries in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create one" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <AgenciesServiceProvider>
                <AgenciesViewContent />
            </AgenciesServiceProvider>
        </Content>
    );
};
