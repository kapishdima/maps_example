import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { AttractionResponseEntity } from "entities/attractions";

import { AttractionForm } from "./Form/AttractionForm";
import { useAttractionsService } from "../hooks/useAttractionsService";
import { AttractionHeading } from "./Form/AttractionHeading";
import { useUpdateAttraction } from "../hooks/useUpdateAttraction";

export const AttractionEditContent: React.FC = () => {
    const attractionsService = useAttractionsService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: attraction, isFetching } = useGetResourceById(
        "attraction",
        (id: string) => attractionsService.getAttraction(id)
    );
    const { mutate: updateAttraction, isLoading } = useUpdateAttraction(
        (id: string, attraction: AttractionResponseEntity) =>
            attractionsService.updateAttraction(id, attraction),
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
                            <AttractionHeading attraction={attraction} />
                            <InlineStatus
                                status={{
                                    value: attraction.status,
                                    label: attraction.status,
                                }}
                            />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <AttractionForm
                onSubmit={updateAttraction}
                defaultValue={attraction}
                isLoading={isLoading}
            />
        </Content>
    );
};
