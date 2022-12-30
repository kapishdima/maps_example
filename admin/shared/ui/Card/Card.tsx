import React, { useState } from "react";

import {
    Card as CardUI,
    CardProps as CardUIProps,
    Heading,
    majorScale,
    Paragraph,
} from "evergreen-ui";

type CardProps = CardUIProps & {
    title?: string;
    hint?: string;
    footer?: JSX.Element;
    hasFooter?: boolean;
};

export const Card: React.FC<CardProps> = ({
    children,
    title,
    hint,
    footer,
    hasFooter,
    ...cardUIProps
}) => {
    return (
        <CardUI
            minWidth="10%"
            backgroundColor="#F4F6FA"
            paddingY={majorScale(2)}
            paddingX={majorScale(4)}
            cursor="pointer"
            {...cardUIProps}
        >
            {title && <Heading size={400}>{title}</Heading>}
            {hint && <Paragraph>{hint}</Paragraph>}
            {children}
            {hasFooter && footer}
        </CardUI>
    );
};
