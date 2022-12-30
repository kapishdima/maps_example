import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { WineryRequestEntity, WineryResponseEntity } from "entities/winery";

import { MainInfo } from "./MainInfo";
import { PlaceInfoTab } from "./PlaceInfo";
import { LocationInfo } from "features/Locations";
import { ContactsInfo } from "./ContactsInfo";
import { OtherInfo } from "./OtherInfo";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";

const tabs = [
    "Main Information",
    "Place Information",
    "Location",
    "Contacts",
    "Other Info",
];

type WineryFormProps = {
    onSubmit: (values: WineryRequestEntity) => void;
    defaultValue?: WineryResponseEntity;
    isLoading?: boolean;
};

export const WineryForm: React.FC<WineryFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const commonDataService = new CommonDataService();
    const requiredLocales = commonDataService.getRequiredLocales();
    const user = commonDataService.getUser();
    const schema = createValidationSchema(
        requiredLocales,
        "winery",
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
                    Winery information
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
            <PlaceInfoTab />
            <LocationInfo index={2} />
            <ContactsInfo />
            <OtherInfo />
        </TabbedForm>
    );
};
