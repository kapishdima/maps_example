import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import { Loading, TabbedForm } from "shared/ui";

import { StatusBar } from "features/Status/StatusBar";
import { ArticleResponseEntity } from "entities/articles";

import { MainInfo } from "./MainInfo";
import { ContentInfo } from "./ContentInfo";
import { createValidationSchema } from "validation";
import { CommonDataService } from "processes/common-data";
import { useAuthStore } from "processes/auth";

const tabs = ["Main Information", "Content"];

type ArticleFormProps = {
    onSubmit: (values: ArticleResponseEntity) => void;
    defaultValue?: ArticleResponseEntity;
    isLoading?: boolean;
};

export const ArticleForm: React.FC<ArticleFormProps> = ({
    onSubmit,
    defaultValue,
    isLoading,
}) => {
    const requiredLocales = new CommonDataService().getRequiredLocales();
    const schema = createValidationSchema(requiredLocales, "article");

    const { user } = useAuthStore();

    return (
        <TabbedForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            defaultValues={defaultValue}
            tabs={tabs}
            validationSchema={schema}
            header={
                <Heading size={500} marginBottom={majorScale(3)}>
                    Article information
                </Heading>
            }
            actions={
                isLoading ? (
                    <Pane>
                        <Loading minWidth="100%" minHeight="32px" />
                    </Pane>
                ) : (
                    <StatusBar
                        only={
                            user.role === "superadmin"
                                ? ["accept", "saveToDraft"]
                                : []
                        }
                    />
                )
            }
        >
            <MainInfo />
            <ContentInfo />
        </TabbedForm>
    );
};
