import React from "react";
import { Heading, majorScale, Pane, Paragraph } from "evergreen-ui";

type FormGroupProps = {
    title: string;
    hint?: string;
    width?: number | string;
    maxWidth?: number | string;
    minWidth?: number | string;
};

export const FormGroup: React.FC<FormGroupProps> = ({
    children,
    title,
    hint,
    width,
    maxWidth,
    minWidth,
}) => {
    return (
        <Pane width={width} maxWidth={maxWidth} minWidth={minWidth}>
            <Pane marginBottom={majorScale(2)}>
                <Heading size={100}>{title}</Heading>
                {hint && <Paragraph>{hint}</Paragraph>}
            </Pane>
            {children}
        </Pane>
    );
};
