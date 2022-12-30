import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { CountryResponseEntity } from "entities/countries";

import { MainInfo } from "./MainInfo";

import { OtherInfo } from "./OtherInfo";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";

const tabs = ["Main Information", "Other Info"];

type CountryFormProps = {
    onSubmit: (values: CountryResponseEntity) => void;
    defaultValue?: CountryResponseEntity;
    isLoading?: boolean;
};

export const CountryForm: React.FC<CountryFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const requiredLocales = new CommonDataService().getRequiredLocales();
    const schema = createValidationSchema(requiredLocales, "country");
    return (
        <TabbedForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            defaultValues={defaultValue}
            tabs={tabs}
            validationSchema={schema}
            header={
                <Heading size={500} marginBottom={majorScale(3)}>
                    Country information
                </Heading>
            }
            actions={
                isLoading ? (
                    <Pane>
                        <Loading minWidth="100%" minHeight="32px" />
                    </Pane>
                ) : (
                    <StatusBar
                        actions={["saveAndPublish", "saveToDraft", "accept"]}
                    />
                )
            }
        >
            <MainInfo />
            <OtherInfo />
        </TabbedForm>
    );
};
