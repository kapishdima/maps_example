import React from "react";
import {
    FormField,
    FilePicker as FileInputUI,
    FormFieldProps,
    majorScale,
} from "evergreen-ui";
import { Input } from "./Input";
import { useCreateMedia } from "processes/media";
import { useControl } from "shared/hooks";

type FileInputProps = FormFieldProps & {
    name: string;
};

export const FileInput: React.FC<FileInputProps> = ({
    label,
    description,
    hint,
    name,
}) => {
    const { createMedia } = useCreateMedia();
    const { setValue } = useControl();

    const onChange = async (files: FileList) => {
        const file = files[0];

        const media = await createMedia(file);
        setValue(name, media.id);
    };

    return (
        <FormField
            label={label}
            description={description}
            hint={hint}
            marginBottom={majorScale(2)}
        >
            <Input name={name}>
                {({ field }) => (
                    <FileInputUI
                        ref={field.ref}
                        multiple={false}
                        onChange={onChange}
                    />
                )}
            </Input>
        </FormField>
    );
};
