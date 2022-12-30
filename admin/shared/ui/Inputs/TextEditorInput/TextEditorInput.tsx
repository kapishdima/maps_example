import React from "react";

import { FormField, FormFieldProps, majorScale } from "evergreen-ui";

import { Input } from "../Input";
import { Editor } from "./Editor";

type EditorInputProps = FormFieldProps & {
    name: string;
};

export const TextEditorInput: React.FC<EditorInputProps> = ({
    label,
    name,
    description,
    placeholder,
}) => {
    return (
        <FormField
            label={label || ""}
            description={description || ""}
            marginBottom={majorScale(3)}
        >
            <Input name={name}>
                {({ field, fieldState }) => {
                    const isInvalid =
                        fieldState.error &&
                        Object.keys(fieldState.error).length;

                    return (
                        <Editor
                            ref={field.ref}
                            name={name}
                            onChange={field.onChange}
                            defaultValue={field.value}
                            placeholder={placeholder}
                            isInvalid={isInvalid}
                            error={fieldState.error}
                        />
                    );
                }}
            </Input>
        </FormField>
    );
};
