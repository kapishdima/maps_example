import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { GrapeResponseEntity } from "entities/grapes";

import { MainInfo } from "./MainInfo";
import { CommonDataService } from "processes/common-data";
import { createValidationSchema } from "validation";

const tabs = ["Main Information"];

type GrapeFormProps = {
    onSubmit: (values: GrapeResponseEntity) => void;
    defaultValue?: GrapeResponseEntity;
    isLoading?: boolean;
};

export const GrapeForm: React.FC<GrapeFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const requiredLocales = new CommonDataService().getRequiredLocales();
    const schema = createValidationSchema(requiredLocales, "grape");
    return (
        <TabbedForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            defaultValues={defaultValue}
            tabs={tabs}
            validationSchema={schema}
            header={
                <Heading size={500} marginBottom={majorScale(3)}>
                    Grape information
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
