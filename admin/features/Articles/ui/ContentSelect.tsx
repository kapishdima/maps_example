import { FormField, FormFieldProps, majorScale } from "evergreen-ui";
import React, { useState } from "react";
import {
    MediaInputSingle,
    Select,
    TextAreaInput,
    TextEditorInput,
    TextInput,
} from "shared/ui";

export type ContentType = {
    label: string;
    value: (name: string) => JSX.Element;
};

export const contentTypes: ContentType[] = [
    {
        label: "video",
        value: (name: string) => (
            <TextInput
                label="Video"
                placeholder="Paste video link"
                name={`${name}.url`}
            />
        ),
    },
    {
        label: "title-text",
        value: (name: string) => (
            <>
                <TextInput
                    label="Title"
                    placeholder="Enter title..."
                    name={`${name}.title`}
                />
                <TextEditorInput
                    label="Text"
                    placeholder="Enter text..."
                    name={`${name}.text`}
                />
            </>
        ),
    },
    {
        label: "text",
        value: (name: string) => (
            <TextEditorInput
                label="Text"
                placeholder="Enter text..."
                name={`${name}.text`}
            />
        ),
    },
    {
        label: "banner",
        value: (name: string) => <MediaInputSingle name={`${name}.image`} />,
    },
];

const options = [
    { label: "Video", value: "video" },
    { label: "Title text", value: "title-text" },
    { label: "Text", value: "text" },
    { label: "Banner", value: "banner" },
];

type ContentSelectProps = FormFieldProps & {
    onSelect: (contentType: ContentType) => void;
};

export const ContentSelect: React.FC<ContentSelectProps> = ({
    label,
    onSelect,
}) => {
    const [selected, setSelected] = useState(null);

    return (
        <FormField
            label={label}
            display="flex"
            flexDirection="column"
            marginBottom={majorScale(3)}
        >
            <Select
                buttonText="Select content type"
                closeOnSelect
                title="Content types"
                options={options}
                selected={selected}
                onSelect={(item) => {
                    setSelected(item);
                    onSelect(
                        contentTypes.find((type) => type.label === item.value)
                    );
                }}
                value={selected?.label}
            />
        </FormField>
    );
};
