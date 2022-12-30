import React from "react";

import { FormField, majorScale } from "evergreen-ui";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

import { Input } from "../Input";

import "./codeEditor.scss";

export const CodeInput = ({ name, label }) => {
    return (
        <FormField label={label} marginBottom={majorScale(3)}>
            <Input name={name}>
                {({ field }) => {
                    return (
                        <AceEditor
                            name={name}
                            placeholder="Type your code"
                            mode="html"
                            theme="monokai"
                            showPrintMargin={false}
                            fontSize={14}
                            value={field.value}
                            onChange={field.onChange}
                            setOptions={{
                                wrap: true,
                                useWorker: false,
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                        />
                    );
                }}
            </Input>
        </FormField>
    );
};
