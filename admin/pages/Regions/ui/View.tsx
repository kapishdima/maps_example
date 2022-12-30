import React from "react";

import { Pane } from "evergreen-ui";

import { RegionsViewContent, RegionsServiceProvider } from "features/Regions";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const RegionsViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Regions Page"
                    hint="On this page you can see all information about regions in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create one" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <RegionsServiceProvider>
                <RegionsViewContent />
            </RegionsServiceProvider>
        </Content>
    );
};
