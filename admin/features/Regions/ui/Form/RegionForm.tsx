import React from "react";

import { Button, Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { MainInfo } from "./MainInfo";
import { RegionResponseEntity } from "entities/region";

const tabs = ["Main Information"];

type RegionFormProps = {
    onSubmit: (values: RegionResponseEntity) => void;
    defaultValue?: RegionResponseEntity;
    isLoading?: boolean;
};

export const RegionForm: React.FC<RegionFormProps> = ({
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
                    Region information
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
