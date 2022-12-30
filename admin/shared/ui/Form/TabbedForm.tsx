import React from "react";

import { Form } from "./Form";
import { TabbedFormView } from "./TabbedFormView";
import { FormProps } from "./types";

export type TabInputs = { [key: string]: string[] };

type TabbedFormProps = FormProps & {
    tabs: string[];
    actions?: JSX.Element;
    header?: JSX.Element;
    defaultValues?: any;
    isLoading?: boolean;
};

export const TabbedForm: React.FC<TabbedFormProps> = ({
    onSubmit,
    validationSchema,
    defaultValues,
    ...props
}) => {
    return (
        <Form
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            defaultValues={defaultValues}
        >
            <TabbedFormView {...props} />
        </Form>
    );
};
