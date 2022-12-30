import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";

import { WineryForm } from "./Form/WineryForm";
import { useCreateWinery } from "../hooks/useCreateWinery";

export const WineryCreateContent: React.FC = () => {
    const { createWinery, isLoading } = useCreateWinery();

    return (
        <Content header={<ContentHeader title="Create a winery" hasBackLink />}>
            <WineryForm onSubmit={createWinery} isLoading={isLoading} />
        </Content>
    );
};
