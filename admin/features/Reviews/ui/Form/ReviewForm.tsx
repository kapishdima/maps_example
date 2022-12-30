import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { ReviewResponseEntity } from "entities/reviews";

import { MainInfo } from "./MainInfo";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";

const tabs = ["Main Information"];

type ReviewFormProps = {
    onSubmit: (values: ReviewResponseEntity) => void;
    defaultValue?: ReviewResponseEntity;
    isLoading?: boolean;
};

export const ReviewForm: React.FC<ReviewFormProps> = ({
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
                    Review information
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
