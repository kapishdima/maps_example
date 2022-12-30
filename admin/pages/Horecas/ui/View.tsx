import React from "react";

import { Pane } from "evergreen-ui";

import { HorecaViewContent, HorecaServiceProvider } from "features/Horeca";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const HorecasViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="HoReCa"
                    actions={
                        <Pane>
                            <CreateLink text="Create HoReCa" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <HorecaServiceProvider>
                <HorecaViewContent />
            </HorecaServiceProvider>
        </Content>
    );
};
