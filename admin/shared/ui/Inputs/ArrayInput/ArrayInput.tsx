import React from "react";

import { majorScale, Pane } from "evergreen-ui";

import { Input } from "../Input";
import { ArrayInputIterator, OnAddButtonClick } from "./ArrayInputIterator";
import { ArrayInputProvider } from "./ArrayInputProvider";
import { FieldArray } from "react-hook-form";

export type Children = (field: any, index: number) => JSX.Element;

export type ArrayInputProps = {
    name: string;
    defaultValue: any;
    title?: string;
    children: Children;
    onAddButtonClick?: OnAddButtonClick;
};

export const ArrayInput: React.FC<ArrayInputProps> = ({
    name,
    title,
    defaultValue,
    children,
    onAddButtonClick,
}) => {
    return (
        <Input name={name}>
            {() => (
                <ArrayInputProvider defaultValue={defaultValue} name={name}>
                    <ArrayInputIterator
                        onAddButtonClick={onAddButtonClick}
                        title={title}
                    >
                        {children}
                    </ArrayInputIterator>
                </ArrayInputProvider>
            )}
        </Input>
    );
};
