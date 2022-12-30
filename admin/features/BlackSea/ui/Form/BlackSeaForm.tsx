import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { BlackSeaResponseEntity } from "entities/black-sea";

import { MainInfo } from "./MainInfo";

import { BlackSeaRouteInfo } from "./BlackSeaRouteInfo";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";

const tabs = ["Main Information", "Black Sea Route"];

type BlackSeaFormProps = {
    onSubmit: (values: BlackSeaResponseEntity) => void;
    defaultValue?: BlackSeaResponseEntity;
    isLoading?: boolean;
};

export const BlackSeaForm: React.FC<BlackSeaFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const requiredLocales = new CommonDataService().getRequiredLocales();
    const schema = createValidationSchema(requiredLocales, "blackSea");

    return (
        <TabbedForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            defaultValues={defaultValue}
            tabs={tabs}
            validationSchema={schema}
            header={
                <Heading size={500} marginBottom={majorScale(3)}>
                    BlackSea information
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
            <BlackSeaRouteInfo />
        </TabbedForm>
    );
};
