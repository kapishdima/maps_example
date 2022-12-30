import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";

import { HorecaForm } from "./Form/HorecaForm";
import { useCreateHoreca } from "../hooks/useCreateHoreca";

export const HorecaCreateContent: React.FC = () => {
    const { createHoreca, isLoading } = useCreateHoreca();

    return (
        <Content header={<ContentHeader title="Create a horeca" hasBackLink />}>
            <HorecaForm onSubmit={createHoreca} isLoading={isLoading} />
        </Content>
    );
};
