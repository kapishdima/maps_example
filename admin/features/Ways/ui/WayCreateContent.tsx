import React from "react";

import { Content, ContentHeader } from "shared/ui";

import { useCreateWay } from "../hooks/useCreateWay";
import { WayForm } from "./Form/WayForm";

export const WayCreateContent: React.FC = () => {
    const { createWay, isLoading } = useCreateWay();

    return (
        <Content header={<ContentHeader title="Create a route" hasBackLink />}>
            <WayForm onSubmit={createWay} isLoading={isLoading} />
        </Content>
    );
};
