import React from "react";

import {
    TextInputField as TextInputUI,
    TextInputFieldProps as TextInputUIProps,
} from "evergreen-ui";

import { Input } from "./Input";
import { InputCoreProps } from "./types";

type TextInputProps = TextInputUIProps & InputCoreProps & {};

export const TextInput: React.FC<TextInputProps> = ({
    name,
    placeholder,
    required,
    disabled,
    width,
    label,
    description,
    rules,
    type,
}) => {
    return (
        <Input name={name} rules={rules} defaultValue={""}>
            {({ field, fieldState }) => {
                const isValid =
                    fieldState.isTouched &&
                    !fieldState.invalid &&
                    Boolean(field.value);

                return (
                    <TextInputUI
                        ref={field.ref}
                        name={name}
                        style={{
                            borderColor: isValid && "#52BD95",
                        }}
                        type={type || "text"}
                        borderColor="green500"
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        width={width}
                        label={label || ""}
                        description={description}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value || ""}
                        isInvalid={fieldState.invalid}
                        isRequired={required}
                        validationMessage={fieldState.error?.message}
                    />
                );
            }}
        </Input>
    );
};
