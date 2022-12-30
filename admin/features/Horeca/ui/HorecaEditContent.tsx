import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { HorecaResponseEntity } from "entities/horeca";

import { HorecaForm } from "./Form/HorecaForm";
import { useHorecaService } from "../hooks/useHorecaService";
import { HorecaHeading } from "./Form/HorecaHeading";
import { useUpdateHoreca } from "../hooks/useUpdateHoreca";

export const HorecaEditContent: React.FC = () => {
    const horecaService = useHorecaService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: horeca, isFetching } = useGetResourceById(
        "horeca",
        (id: string) => horecaService.getHoreca(id)
    );
    const { mutate: updateHoreca, isLoading } = useUpdateHoreca(
        (id: string, horeca: HorecaResponseEntity) =>
            horecaService.updateHoreca(id, horeca),
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
                            <HorecaHeading horeca={horeca} />
                            <InlineStatus
                                status={{
                                    value: horeca.status,
                                    label: horeca.status,
                                }}
                            />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <HorecaForm
                onSubmit={updateHoreca}
                defaultValue={horeca}
                isLoading={isLoading}
            />
        </Content>
    );
};
