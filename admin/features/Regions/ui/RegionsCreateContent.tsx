import React from "react";

import { Content, ContentHeader } from "shared/ui";

import { RegionForm } from "./Form/RegionForm";
import { useCreateRegion } from "../hooks/useCreateRegion";

export const RegionCreateContent: React.FC = () => {
    const { createRegion, isLoading } = useCreateRegion();

    return (
        <Content header={<ContentHeader title="Create region" hasBackLink />}>
            <RegionForm onSubmit={createRegion} isLoading={isLoading} />
        </Content>
    );
};
