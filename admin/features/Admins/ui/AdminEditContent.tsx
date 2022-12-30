import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { AdminResponseEntity } from "entities/admins";

import { AdminForm } from "./Form/AdminForm";
import { useAdminsService } from "../hooks/useAdminsService";
import { AdminHeading } from "./Form/AdminHeading";
import { useUpdateAdmin } from "../hooks/useUpdateAdmin";

export const AdminEditContent: React.FC = () => {
    const adminsService = useAdminsService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: admin, isFetching } = useGetResourceById(
        "admin",
        (id: string) => adminsService.getAdmin(id)
    );
    const { mutate: updateAdmin, isLoading } = useUpdateAdmin(
        (id: string, admin: AdminResponseEntity) =>
            adminsService.updateAdmin(id, admin),
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
                            <AdminHeading admin={admin} />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <AdminForm
                onSubmit={updateAdmin}
                defaultValue={admin}
                isLoading={isLoading}
            />
        </Content>
    );
};
