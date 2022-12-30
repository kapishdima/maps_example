import React, { useEffect, useRef } from "react";

import MediumEditor from "medium-editor";
import {
    ErrorIcon,
    Heading,
    majorScale,
    minorScale,
    Pane,
    Paragraph,
} from "evergreen-ui";

import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import { FieldError } from "react-hook-form";

type EditorProps = {
    onChange: (value: string) => void;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    isInvalid: boolean;
    error: FieldError;
};

export const Editor = React.forwardRef<any, React.PropsWithChildren<any>>(
    ({ onChange, name, placeholder, defaultValue, isInvalid, error }, ref) => {
        const mediumEditorRef = useRef<MediumEditor.MediumEditor>(null);
        const editorId = `text-editor__input--${name.replace(/\./g, "_")}`;

        const handleChange = (value: string) => {
            onChange(value);
        };

        useEffect(() => {
            mediumEditorRef.current = new MediumEditor(`.${editorId}`, {
                toolbar: { buttons: ["bold", "italic", "underline", "anchor"] },
                placeholder: { text: placeholder },
            });

            mediumEditorRef.current.subscribe(
                "editableInput",
                (event, self) => {
                    handleChange(self.innerHTML);
                }
            );

            return () => mediumEditorRef.current?.destroy();
        }, []);

        useEffect(() => {
            if (!defaultValue) {
                return;
            }

            mediumEditorRef.current?.setContent(defaultValue);
        }, [mediumEditorRef.current]);

        return (
            <>
                <Pane
                    ref={ref}
                    width="100%"
                    border
                    borderColor={isInvalid ? "#D14343" : "#d8dae5"}
                    borderRadius={minorScale(1)}
                    padding={minorScale(3)}
                    fontFamily="Inter"
                    fontSize={minorScale(3)}
                    color="#474d66"
                    lineHeight={`${majorScale(2)}px`}
                    outline="none"
                    className={editorId}
                ></Pane>
                {error ? (
                    <Heading
                        size={200}
                        color="#D14343"
                        display="flex"
                        alignItems="center"
                        fontWeight={400}
                        marginTop={majorScale(2)}
                        columnGap={majorScale(1)}
                    >
                        <ErrorIcon color="danger" />
                        {error.message}
                    </Heading>
                ) : null}
            </>
        );
    }
);
