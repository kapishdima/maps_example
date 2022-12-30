import React, { useEffect } from "react";
import { Button, majorScale, Pane, PlusIcon } from "evergreen-ui";
import { useArrayInput } from "./hooks/useArrayInput";

import { Children } from "./ArrayInput";
import { ArrayItem } from "./ArrayItem";

export type OnAddButtonClick = (append: (value: any) => void) => void;

export type ArrayInputIteratorProps = {
    title?: string;
    children: Children;
    onAddButtonClick?: OnAddButtonClick;
};

export const ArrayInputIterator: React.FC<ArrayInputIteratorProps> = ({
    title,
    children,
    onAddButtonClick,
}) => {
    const { fields, append } = useArrayInput();

    return (
        <Pane>
            <Button
                appearance="minimal"
                intent="primary"
                type="button"
                onClick={() => {
                    onAddButtonClick ? onAddButtonClick(append) : append();
                }}
                iconAfter={PlusIcon}
                marginBottom={majorScale(2)}
            >
                Add Item
            </Button>
            {fields.map((field, index) => (
                <ArrayItem key={field.id} index={index} title={title}>
                    {children(field, index)}
                </ArrayItem>
            ))}
        </Pane>
    );
};
