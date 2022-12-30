import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { EventResponseEntity } from "entities/events";

import { MainInfo } from "./MainInfo";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";

const tabs = ["Main Information"];

type EventFormProps = {
    onSubmit: (values: EventResponseEntity) => void;
    defaultValue?: EventResponseEntity;
    isLoading?: boolean;
};

export const EventForm: React.FC<EventFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const commonDataService = new CommonDataService();
    const requiredLocales = commonDataService.getRequiredLocales();
    const user = commonDataService.getUser();
    const schema = createValidationSchema(
        requiredLocales,
        "event",
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
                    Event information
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
