import React from "react";

import { Tabs, SubmitButton } from "shared/ui";

import { TabInputs } from "./TabbedForm";

type TabbedFormViewProps = {
    tabs: string[];
    actions?: JSX.Element;
    header?: JSX.Element;
    inputs?: TabInputs;
    defaultValues?: any;
    isLoading?: boolean;
};

export const TabbedFormView: React.FC<TabbedFormViewProps> = ({
    children,
    tabs,
    actions,
    isLoading,
    header,
}) => {
    return (
        <>
            {header ? header : null}

            <Tabs tabs={tabs} appearance="primary">
                {children}
            </Tabs>
            {actions ? (
                actions
            ) : (
                <SubmitButton isLoading={isLoading} text="Submit" />
            )}
        </>
    );
};
