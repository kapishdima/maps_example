import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { AgencyResponseEntity } from "entities/agencies";

import { AgencyForm } from "./Form/AgencyForm";
import { useAgenciesService } from "../hooks/useAgenciesService";
import { AgencyHeading } from "./Form/AgencyHeading";
import { useUpdateAgency } from "../hooks/useUpdateAgency";

export const AgencyEditContent: React.FC = () => {
    const agenciesService = useAgenciesService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: agency, isFetching } = useGetResourceById(
        "agency",
        (id: string) => agenciesService.getAgency(id)
    );
    const { mutate: updateAgency, isLoading } = useUpdateAgency(
        (id: string, agency: AgencyResponseEntity) =>
            agenciesService.updateAgency(id, agency),
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
                            <AgencyHeading agency={agency} />
                            <InlineStatus
                                status={{
                                    value: agency.status,
                                    label: agency.status,
                                }}
                            />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <AgencyForm
                onSubmit={updateAgency}
                defaultValue={agency}
                isLoading={isLoading}
            />
        </Content>
    );
};
