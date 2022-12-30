import React from "react";

import { FormField, FormFieldProps } from "evergreen-ui";

import { TranslatableInput } from "shared/ui/Inputs/TranslatableInput";

import { InputCoreProps } from "./types";
import { TextAreaInput } from "./TextAreaInput";

type TranslatableTextAreaInputProps = InputCoreProps &
    FormFieldProps & {
        isInline?: boolean;
        rows?: number;
        required?: boolean;
    };

export const TranslatableTextAreaInput: React.FC<
    TranslatableTextAreaInputProps
> = ({
    name,
    label,
    hint,
    description,
    placeholder,
    isInline,
    rows,
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
                        <TextAreaInput
                            name={createTranslationsKey(locale)}
                            placeholder={placeholder}
                            rows={rows}
                        />
                    );
                }}
            </TranslatableInput>
        </FormField>
    );
};
