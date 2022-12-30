import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { SettingsResponseEntity } from "entities/settings";

import { MainInfo } from "./MainInfo";

import { OtherInfo } from "./OtherInfo";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";

const tabs = ["Main Information", "Other Info"];

type SettingsFormProps = {
    onSubmit: (values: SettingsResponseEntity) => void;
    defaultValue?: SettingsResponseEntity;
    isLoading?: boolean;
};

export const SettingsForm: React.FC<SettingsFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const requiredLocales = new CommonDataService().getRequiredLocales();
    const schema = createValidationSchema(requiredLocales, "settings");
    return (
        <TabbedForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            defaultValues={defaultValue}
            tabs={tabs}
            validationSchema={schema}
            header={
                <Heading size={500} marginBottom={majorScale(3)}>
                    Settings information
                </Heading>
            }
            actions={
                isLoading ? (
                    <Pane>
                        <Loading minWidth="100%" minHeight="32px" />
                    </Pane>
                ) : (
                    <StatusBar actions={["accept"]} />
                )
            }
        >
            <MainInfo />
            <OtherInfo />
        </TabbedForm>
    );
};
