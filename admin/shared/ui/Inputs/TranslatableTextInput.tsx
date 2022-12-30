import React from "react";

import { FormField, FormFieldProps } from "evergreen-ui";

import { TextInput } from "shared/ui/Inputs/TextInput";
import { TranslatableInput } from "shared/ui/Inputs/TranslatableInput";

import { InputCoreProps } from "./types";

type TranslatableTextInputProps = InputCoreProps &
    FormFieldProps & {
        isInline?: boolean;
        required?: boolean;
    };

export const TranslatableTextInput: React.FC<TranslatableTextInputProps> = ({
    name,
    label,
    hint,
    description,
    placeholder,
    isInline,
    required,
}) => {
    const createTranslationsKey = (locale: number) => {
        if (isInline) {
            return `${name}.${locale}`;
        }

        return `translations.${locale}.${name}`;
    };

    return (
        <FormField
            label={label}
            description={description}
            hint={hint}
            isRequired={required}
        >
            <TranslatableInput>
                {(locale) => {
                    return (
                        <TextInput
                            name={createTranslationsKey(locale)}
                            placeholder={placeholder}
                        />
                    );
                }}
            </TranslatableInput>
        </FormField>
    );
};
