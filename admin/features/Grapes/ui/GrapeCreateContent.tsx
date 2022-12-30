import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";

import { GrapeForm } from "./Form/GrapeForm";
import { useCreateGrape } from "../hooks/useCreateGrape";

export const GrapeCreateContent: React.FC = () => {
    const { createGrape, isLoading } = useCreateGrape();

    return (
        <Content
            header={
                <ContentHeader title="Create a Grape variety" hasBackLink />
            }
        >
            <GrapeForm onSubmit={createGrape} isLoading={isLoading} />
        </Content>
    );
};
