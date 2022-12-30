import React from "react";

import { Pane } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useWaysService } from "processes/ways";

import { WayForm } from "./Form/WayForm";
import { WayHeading } from "./WayHeading";
import { useUpdateWay } from "../hooks/useUpdateWay";
import { WayRequestEntity } from "entities/ways";
import { useGetWayById } from "../hooks/useGetWayById";

export const WayEditContent: React.FC = () => {
    const wayService = useWaysService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { way, isFetching } = useGetWayById();

    const { mutate: updateWay, isLoading } = useUpdateWay(
        (id: string, way: WayRequestEntity) => wayService.updateWay(id, way),
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
                            <WayHeading way={way} />
                            <Pane display="flex" alignItems="center">
                                <InlineStatus
                                    status={{
                                        value: way.status,
                                        label: way.status,
                                    }}
                                />
                            </Pane>
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <WayForm
                onSubmit={updateWay}
                defaultValue={way}
                isLoading={isLoading}
            />
        </Content>
    );
};
