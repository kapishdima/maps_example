import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";

import { AdminForm } from "./Form/AdminForm";
import { useCreateAdmin } from "../hooks/useCreateAdmin";

export const AdminCreateContent: React.FC = () => {
    const { createAdmin, isLoading } = useCreateAdmin();

    return (
        <Content header={<ContentHeader title="Create an Admin" hasBackLink />}>
            <AdminForm onSubmit={createAdmin} isLoading={isLoading} />
        </Content>
    );
};
