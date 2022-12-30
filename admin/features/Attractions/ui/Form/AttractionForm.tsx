import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { AttractionResponseEntity } from "entities/attractions";

import { MainInfo } from "./MainInfo";
import { LocationInfo } from "features/Locations";
import { ContactsInfo } from "./ContactsInfo";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";

const tabs = ["Main Information", "Location", "Contacts"];

type AttractionFormProps = {
    onSubmit: (values: AttractionResponseEntity) => void;
    defaultValue?: AttractionResponseEntity;
    isLoading?: boolean;
};

export const AttractionForm: React.FC<AttractionFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const commonDataService = new CommonDataService();
    const requiredLocales = commonDataService.getRequiredLocales();
    const user = commonDataService.getUser();
    const schema = createValidationSchema(
        requiredLocales,
        "attraction",
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
                    Attraction information
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
            <LocationInfo index={1} />
            <ContactsInfo />
        </TabbedForm>
    );
};
