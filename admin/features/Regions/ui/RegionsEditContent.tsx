import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { RegionResponseEntity } from "entities/region";

import { RegionForm } from "./Form/RegionForm";
import { RegionHeading } from "./Form/RegionHeading";

import { useRegionsService } from "../hooks/useRegionsService";
import { useUpdateRegion } from "../hooks/useUpdateRegion";

export const RegionsEditContent: React.FC = () => {
    const regionsService = useRegionsService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: region, isFetching } = useGetResourceById(
        "regions",
        (id: string) => regionsService.getRegion(id)
    );
    const { mutate: updateRegions, isLoading } = useUpdateRegion(
        (id: string, region: RegionResponseEntity) =>
            regionsService.updateRegion(id, region),
        onUpdateSuccess
    );

    if (isFetching) {
        return <Loading minWidth="100vw" minHeight="100vh" />;
    }

    return (
        <Content
            header={
                <ContentHeader
                    title={
                        <Pane display="flex" alignItems="center">
                            <RegionHeading region={region} />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <RegionForm
                onSubmit={updateRegions}
                defaultValue={region}
                isLoading={isLoading}
            />
        </Content>
    );
};
