import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { AgencyResponseEntity } from "entities/agencies";

import { MainInfo } from "./MainInfo";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";

const tabs = ["Main Information"];

type AgencyFormProps = {
    onSubmit: (values: AgencyResponseEntity) => void;
    defaultValue?: AgencyResponseEntity;
    isLoading?: boolean;
};

export const AgencyForm: React.FC<AgencyFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const commonDataService = new CommonDataService();
    const requiredLocales = commonDataService.getRequiredLocales();
    const user = commonDataService.getUser();
    const schema = createValidationSchema(
        requiredLocales,
        "agency",
        user.role === "superadmin"
    );
    return (
        <TabbedForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            defaultValues={defaultValue}
            tabs={tabs}
            validationSchema={schema}
            header={
                <Heading size={500} marginBottom={majorScale(3)}>
                    Agency information
                </Heading>
            }
            actions={
                isLoading ? (
                    <Pane>
                        <Loading minWidth="100%" minHeight="32px" />
                    </Pane>
                ) : (
                    <StatusBar />
                )
            }
        >
            <MainInfo />
        </TabbedForm>
    );
};
