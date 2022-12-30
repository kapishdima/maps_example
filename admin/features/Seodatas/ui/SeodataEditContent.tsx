import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { SeodataResponseEntity } from "entities/seodatas";

import { SeodataForm } from "./Form/SeodataForm";
import { useSeodatasService } from "../hooks/useSeodatasService";
import { SeodataHeading } from "./Form/SeodataHeading";
import { useUpdateSeodata } from "../hooks/useUpdateSeodata";

export const SeodataEditContent: React.FC = () => {
    const seodatasService = useSeodatasService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: seodata, isFetching } = useGetResourceById(
        "seodata",
        (id: string) => seodatasService.getSeodata(id)
    );
    const { mutate: updateSeodata, isLoading } = useUpdateSeodata(
        (id: string, seodata: SeodataResponseEntity) =>
            seodatasService.updateSeodata(id, seodata),
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
                            <SeodataHeading seodata={seodata} />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <SeodataForm
                onSubmit={updateSeodata}
                defaultValue={seodata}
                isLoading={isLoading}
            />
        </Content>
    );
};
