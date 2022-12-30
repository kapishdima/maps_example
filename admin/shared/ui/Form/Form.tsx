import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormContextType, OnSubmitFunction } from "./types";
import { first, get } from "lodash";
import {
    createErrorNotification,
    createWarningNotification,
} from "../Notifications/notifications";

interface FormProps {
    onSubmit: OnSubmitFunction;
    validationSchema?: any;
    defaultValues?: any;
    id?: string;
}

export const FormContext = React.createContext<FormContextType>({
    control: null,
    state: null,
    setValue: null,
    getValues: null,
});

export const Form: React.FC<FormProps> = ({
    onSubmit,
    children,
    validationSchema,
    defaultValues,
    id,
}) => {
    const { control, handleSubmit, formState, setValue, getValues, setFocus } =
        useForm({
            resolver: validationSchema ? yupResolver(validationSchema) : null,
            defaultValues,
        });

    const onSubmitWithPreventedEvent = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        if (event) {
            if (typeof event.preventDefault === "function") {
                event.preventDefault();
            }
            if (typeof event.stopPropagation === "function") {
                event.stopPropagation();
            }
        }
        return handleSubmit(onSubmit)(event);
    };

    useEffect(() => {
        if (!formState?.errors) {
            return;
        }

        const firstError = first(Object.entries(formState.errors));

        if (!firstError) {
            return;
        }

        const [name, value] = firstError;
        let field = name;

        if (typeof value === "object") {
            const [key, nestedValue] = Object.entries(value)[0];

            field = `${name}.${key}.${Object.keys(nestedValue)[0]}`;
        }

        const ref = get(formState.errors, field).ref;

        if (!ref) {
            return;
        }

        setFocus(field);
    }, [formState?.errors, setFocus]);

    useEffect(() => {
        if (Object.keys(formState?.errors).length) {
            createWarningNotification({
                title: "Send error",
                description:
                    "The form cannot be submitted because you did not complete a field",
            });
        }
    }, [formState?.errors]);

    return (
        <form id={id} onSubmit={onSubmitWithPreventedEvent}>
            <FormContext.Provider
                value={{ control, state: formState, setValue, getValues }}
            >
                {children}
            </FormContext.Provider>
        </form>
    );
};
