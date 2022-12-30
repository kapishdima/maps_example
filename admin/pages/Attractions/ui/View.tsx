import React from "react";

import { Pane } from "evergreen-ui";

import {
    AttractionsViewContent,
    AttractionsServiceProvider,
} from "features/Attractions";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const AttractionsViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Attractions Page"
                    hint="On this page you can see all information about wineries in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create one" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <AttractionsServiceProvider>
                <AttractionsViewContent />
            </AttractionsServiceProvider>
        </Content>
    );
};
