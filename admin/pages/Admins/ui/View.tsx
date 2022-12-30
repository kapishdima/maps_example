import React from "react";

import { Pane } from "evergreen-ui";

import { AdminsViewContent, AdminsServiceProvider } from "features/Admins";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const AdminsViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Admins Page"
                    hint="On this page you can see all information about wineries in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create one" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <AdminsServiceProvider>
                <AdminsViewContent />
            </AdminsServiceProvider>
        </Content>
    );
};
