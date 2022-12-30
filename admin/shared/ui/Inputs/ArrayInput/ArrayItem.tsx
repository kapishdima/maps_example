import React from "react";

import { Pane, Heading, majorScale, minorScale } from "evergreen-ui";
import { useArrayInput } from "./hooks/useArrayInput";
import { ArrayInputActions } from "./ArrayInputActions";

type ArrayItemProps = {
    index: number;
    title?: string;
};

export const ArrayItem: React.FC<ArrayItemProps> = ({
    children,
    title,
    index,
}) => {
    const { fields } = useArrayInput();

    const isSingle = () => fields.length <= 1;

    const isFirst = () => index === 0;
    const isLast = () => index === fields.length - 1;

    return (
        <Pane
            border="muted"
            padding={majorScale(2)}
            borderRadius={majorScale(2)}
            marginBottom={isSingle() ? 0 : majorScale(3)}
        >
            <Pane
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={majorScale(2)}
                paddingY={minorScale(1)}
                paddingX={minorScale(4)}
                background="gray50"
                borderRadius={majorScale(1)}
            >
                <Heading size={100}>{title}</Heading>
                <ArrayInputActions
                    index={index}
                    isSingle={isSingle}
                    isFirst={isFirst}
                    isLast={isLast}
                />
            </Pane>
            {children}
        </Pane>
    );
};
