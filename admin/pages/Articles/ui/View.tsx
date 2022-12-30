import React from "react";

import { Pane } from "evergreen-ui";

import {
    ArticlesViewContent,
    ArticlesServiceProvider,
} from "features/Articles";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const ArticlesViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Articles Page"
                    hint="On this page you can see all information about wineries in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create one" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <ArticlesServiceProvider>
                <ArticlesViewContent />
            </ArticlesServiceProvider>
        </Content>
    );
};
