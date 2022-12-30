import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { StatusBar } from "features";

import { Loading, TabbedForm } from "shared/ui";

import { WayResponseEntity } from "entities/ways";
import { LocationViewEntity } from "entities/location";

import { MainInformation } from "./MainInformation";
import { RouteInformation } from "./RouteInformation";
import { ImagesInformation } from "./ImagesInformation";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";

const tabs = ["Main Information", "Images Information", "Route Information"];

type WayFormProps = {
    onSubmit: (values: any) => void;
    defaultValue?: WayResponseEntity<LocationViewEntity[]>;
    isLoading?: boolean;
};

export const WayForm: React.FC<WayFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const commonDataService = new CommonDataService();
    const requiredLocales = commonDataService.getRequiredLocales();
    const user = commonDataService.getUser();
    const schema = createValidationSchema(
        requiredLocales,
        "way",
        user.role === "superadmin"
    );
    return (
        <TabbedForm
            tabs={tabs}
            defaultValues={defaultValue}
            onSubmit={onSubmit}
            validationSchema={schema}
            header={
                <Heading size={500} marginBottom={majorScale(3)}>
                    Way information
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
            <MainInformation />
            <ImagesInformation />
            <RouteInformation />
        </TabbedForm>
    );
};
