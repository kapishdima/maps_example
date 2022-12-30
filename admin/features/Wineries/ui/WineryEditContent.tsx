import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { WineryRequestEntity, WineryResponseEntity } from "entities/winery";

import { WineryForm } from "./Form/WineryForm";
import { useWineriesService } from "../hooks/useWineriesService";
import { WineryHeading } from "./Form/WineryHeading";
import { useUpdateWinery } from "../hooks/useUpdateWinery";

export const WineryEditContent: React.FC = () => {
    const wineriesService = useWineriesService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: winery, isFetching } = useGetResourceById(
        "winery",
        (id: string) => wineriesService.getWinery(id)
    );
    const { mutate: updateWinery, isLoading } = useUpdateWinery(
        (id: string, winery: WineryRequestEntity) =>
            wineriesService.updateWinery(id, winery),
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
                            <WineryHeading winery={winery} />
                            <InlineStatus
                                status={{
                                    value: winery.status,
                                    label: winery.status,
                                }}
                            />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <WineryForm
                onSubmit={updateWinery}
                defaultValue={winery}
                isLoading={isLoading}
            />
        </Content>
    );
};
