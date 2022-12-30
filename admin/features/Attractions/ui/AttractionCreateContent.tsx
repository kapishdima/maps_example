import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";

import { AttractionForm } from "./Form/AttractionForm";
import { useCreateAttraction } from "../hooks/useCreateAttraction";

export const AttractionCreateContent: React.FC = () => {
    const { createAttraction, isLoading } = useCreateAttraction();

    return (
        <Content
            header={<ContentHeader title="Create an Attraction" hasBackLink />}
        >
            <AttractionForm onSubmit={createAttraction} isLoading={isLoading} />
        </Content>
    );
};
