import React from "react";

import { Button, Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { SeodataResponseEntity } from "entities/seodatas";

import { MainInfo } from "./MainInfo";

const tabs = ["Main Information"];

type SeodataFormProps = {
    onSubmit: (values: SeodataResponseEntity) => void;
    defaultValue?: SeodataResponseEntity;
    isLoading?: boolean;
};

export const SeodataForm: React.FC<SeodataFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    return (
        <TabbedForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            defaultValues={defaultValue}
            tabs={tabs}
            header={
                <Heading size={500} marginBottom={majorScale(3)}>
                    Seodata information
                </Heading>
            }
            actions={
                isLoading ? (
                    <Pane>
                        <Loading minWidth="100%" minHeight="32px" />
                    </Pane>
                ) : (
                    <Button fontWeight="600" appearance="primary" type="submit">
                        {"Save"}
                    </Button>
                )
            }
        >
            <MainInfo />
        </TabbedForm>
    );
};
