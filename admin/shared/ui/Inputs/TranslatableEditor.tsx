import React from "react";

import { FormField, FormFieldProps } from "evergreen-ui";

import { TranslatableInput } from "shared/ui/Inputs/TranslatableInput";

import { InputCoreProps } from "./types";
import { Editor } from "../Editor/Editor";

type TranslatableEditorProps = InputCoreProps &
    FormFieldProps & {
        isInline?: boolean;
        rows?: number;
        small?: boolean;
    };

export const TranslatableEditor: React.FC<TranslatableEditorProps> = ({
    name,
    label,
    description,
    placeholder,
    hint,
    isInline,
    small = false,
}) => {
    const createTranslationsKey = (locale: number) => {
        if (isInline) {
            return `translations.${locale - 1}`;
        }
        return `translations.${locale - 1}.${name}`;
    };

    return (
        <FormField label={label} description={description} hint={hint}>
            <TranslatableInput>
                {(locale) => {
                    return (
                        <Editor
                            placeholder={placeholder}
                            name={createTranslationsKey(locale)}
                            id={`${name}-${locale}`}
                            small={small}
                        />
                    );
                }}
            </TranslatableInput>
        </FormField>
    );
};
