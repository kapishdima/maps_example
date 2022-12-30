import { Heading, majorScale, Pane, Paragraph } from "evergreen-ui";
import React from "react";

type FormHeader = {
    isSticky?: boolean;
    title?: string;
    hint?: string;
};

export const FormHeader: React.FC<FormHeader> = ({
    isSticky,
    title,
    hint,
    children,
}) => {
    return (
        <Pane
            width="100%"
            display="flex"
            justifyContent="space-between"
            position={isSticky ? "sticky" : "static"}
            top={0}
            paddingY={majorScale(4)}
            background="#fff"
        >
            {title && <Heading>{title}</Heading>}
            {children}
        </Pane>
    );
};
