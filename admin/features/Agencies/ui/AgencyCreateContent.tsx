import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";

import { AgencyForm } from "./Form/AgencyForm";
import { useCreateAgency } from "../hooks/useCreateAgency";

export const AgencyCreateContent: React.FC = () => {
    const { createAgency, isLoading } = useCreateAgency();

    return (
        <Content
            header={<ContentHeader title="Create an Agency" hasBackLink />}
        >
            <AgencyForm onSubmit={createAgency} isLoading={isLoading} />
        </Content>
    );
};
