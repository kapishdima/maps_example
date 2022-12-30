import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";

import { SeodataForm } from "./Form/SeodataForm";
import { useCreateSeodata } from "../hooks/useCreateSeodata";

export const SeodataCreateContent: React.FC = () => {
    const { createSeodata, isLoading } = useCreateSeodata();

    return (
        <Content header={<ContentHeader title="Create Seodata" hasBackLink />}>
            <SeodataForm onSubmit={createSeodata} isLoading={isLoading} />
        </Content>
    );
};
