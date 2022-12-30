import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { GrapeResponseEntity } from "entities/grapes";

import { GrapeForm } from "./Form/GrapeForm";
import { useGrapesService } from "../hooks/useGrapesService";
import { GrapeHeading } from "./Form/GrapeHeading";
import { useUpdateGrape } from "../hooks/useUpdateGrape";

export const GrapeEditContent: React.FC = () => {
    const grapesService = useGrapesService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: grape, isFetching } = useGetResourceById(
        "grape",
        (id: string) => grapesService.getGrape(id)
    );
    const { mutate: updateGrape, isLoading } = useUpdateGrape(
        (id: string, grape: GrapeResponseEntity) =>
            grapesService.updateGrape(id, grape),
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
                            <GrapeHeading grape={grape} />
                            <InlineStatus
                                status={{
                                    value: grape.status,
                                    label: grape.status,
                                }}
                            />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <GrapeForm
                onSubmit={updateGrape}
                defaultValue={grape}
                isLoading={isLoading}
            />
        </Content>
    );
};
