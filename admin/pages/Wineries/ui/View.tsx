import React from "react";

import { Pane } from "evergreen-ui";

import {
    WineriesViewContent,
    WineriesServiceProvider,
} from "features/Wineries";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const WineriesViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Wineries Page"
                    hint="On this page you can see all information about wineries in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create one" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <WineriesServiceProvider>
                <WineriesViewContent />
            </WineriesServiceProvider>
        </Content>
    );
};
