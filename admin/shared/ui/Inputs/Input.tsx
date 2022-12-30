import React from "react";

import {
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    useController,
    UseFormStateReturn,
    ControllerProps,
    useWatch,
    Controller,
} from "react-hook-form";

import { useControl } from "shared/hooks/useControl";
import { InputCoreProps } from "./types";

type InputProps = InputCoreProps & {
    children: (options: ChildrenOptions) => JSX.Element;
    defaultValue?: any;
};

type ChildrenOptions = {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
};

export const Input: React.FC<InputProps> = ({
    name,
    rules,
    children,
    defaultValue,
}) => {
    const { control } = useControl();

    if (!control) {
        console.error(
            `[${Input.name}:${name}]: Props 'control' has not been defined form input '${name}'`
        );
        return null;
    }

    const { field, fieldState, formState } = useController({
        name,
        control,
        rules,
        defaultValue,
    });

    return children({ field, fieldState, formState });
};
