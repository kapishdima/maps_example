import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { HorecaResponseEntity } from "entities/horeca";

import { MainInfo } from "./MainInfo";
import { LocationInfo } from "features/Locations";
import { ContactsInfo } from "./ContactsInfo";
import { CommonDataService } from "processes/common-data";
import { createValidationSchema } from "validation";

const tabs = ["Main Information", "Location", "Contacts"];

type HorecaFormProps = {
    onSubmit: (values: HorecaResponseEntity) => void;
    defaultValue?: HorecaResponseEntity;
    isLoading?: boolean;
};

export const HorecaForm: React.FC<HorecaFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const commonDataService = new CommonDataService();
    const requiredLocales = commonDataService.getRequiredLocales();
    const user = commonDataService.getUser();
    const schema = createValidationSchema(
        requiredLocales,
        "horeca",
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
                    Horeca information
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
