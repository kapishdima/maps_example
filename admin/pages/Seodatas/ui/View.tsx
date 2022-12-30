import React from "react";

import { Pane } from "evergreen-ui";

import {
    SeodatasViewContent,
    SeodatasServiceProvider,
} from "features/Seodatas";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const SeodatasViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Seodatas Page"
                    hint="On this page you can see all information about wineries in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create one" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <SeodatasServiceProvider>
                <SeodatasViewContent />
            </SeodatasServiceProvider>
        </Content>
    );
};
