import React from "react";

import { Pane } from "evergreen-ui";

import { GrapesViewContent, GrapesServiceProvider } from "features/Grapes";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const GrapesViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Grapes Page"
                    hint="On this page you can see all information about wineries in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create one" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <GrapesServiceProvider>
                <GrapesViewContent />
            </GrapesServiceProvider>
        </Content>
    );
};
