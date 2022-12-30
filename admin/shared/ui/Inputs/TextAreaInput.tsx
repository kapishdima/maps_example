import React from "react";

import {
    Pane,
    TextareaField as TextAreaUI,
    TextareaFieldProps as TextAreaUIProps,
    majorScale,
    FormField,
} from "evergreen-ui";
import { Input } from "./Input";
import { InputCoreProps } from "./types";

type TextAreaInputProps = TextAreaUIProps &
    InputCoreProps & {
        rows?: number;
        required?: boolean;
    };

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
    name,
    label,
    description,
    hint,
    placeholder,
    rows,
    required,
}) => {
    return (
        <FormField
            label={label}
            description={description}
            hint={hint}
            isRequired={required}
        >
            <Input name={name} defaultValue="">
                {({ field, fieldState }) => {
                    const isValid =
                        fieldState.isTouched &&
                        !fieldState.invalid &&
                        Boolean(field.value);

                    return (
                        <TextAreaUI
                            ref={field.ref}
                            style={{
                                borderColor: isValid && "#52BD95",
                            }}
                            rows={rows}
                            name={name}
                            placeholder={placeholder}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            isInvalid={fieldState.invalid}
                            validationMessage={fieldState.error?.message}
                        />
                    );
                }}
            </Input>
        </FormField>
    );
};
