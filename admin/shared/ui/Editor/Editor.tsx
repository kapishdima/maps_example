import React, { useEffect, useRef, useState } from "react";

import { createEditor, BaseEditor, Descendant } from "slate";

import { Slate, Editable, withReact, ReactEditor } from "slate-react";

import { useController } from "react-hook-form";
import { Label, Pane } from "evergreen-ui";

import { useControl } from "shared/hooks/useControl";
import { EditorProps } from "./types";

// bold, italic, crossed, link
export const Editor: React.FC<EditorProps> = ({
    id,
    placeholder,
    name,
    defaultValue,
    rules,
    label,
    small = false,
}) => {
    const holder = id || `react-editor-js-${Date.now().toString(16)}`;
    const [editor] = useState(() => withReact(createEditor() as ReactEditor));

    const defaultPlaceholder = placeholder || "Let`s write an awesome story!";

    const { control } = useControl();

    const { field } = useController({
        name,
        control,
        defaultValue,
        rules,
    });

    return (
        <Pane>
            <Label>{label}</Label>
            <Slate editor={editor} value={field.value}>
                <Editable />
            </Slate>
        </Pane>
    );
};
