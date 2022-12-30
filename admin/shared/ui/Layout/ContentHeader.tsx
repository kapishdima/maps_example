import React from "react";

import { Pane, Heading, majorScale, Paragraph, minorScale } from "evergreen-ui";
import { BackLink } from "../Button/BackLink";

interface PageHeaderProps {
    title?: string | JSX.Element;
    actions?: JSX.Element;
    isSticky?: boolean;
    hint?: string;
    hasBackLink?: boolean;
}

export const ContentHeader: React.FC<PageHeaderProps> = ({
    title,
    actions,
    isSticky,
    hint,
    hasBackLink,
}) => {
    return (
        <Pane
            flex={1}
            justifyContent="space-between"
            alignItems="center"
            display="flex"
            position={`${isSticky ? "sticky" : "static"}`}
            top={`${isSticky ? 0 : "initial"}`}
            background="white"
            padding={majorScale(3)}
            borderBottomLeftRadius={majorScale(2)}
            borderBottomRightRadius={majorScale(2)}
        >
            <Pane display="flex">
                {hasBackLink && <BackLink />}
                <Pane marginLeft={majorScale(1)} marginTop={minorScale(1)}>
                    <Heading size={700}>{title}</Heading>
                    <Paragraph
                        color="gray600"
                        marginTop={majorScale(1)}
                        maxWidth={380}
                    >
                        {hint}
                    </Paragraph>
                </Pane>
            </Pane>
            {actions}
        </Pane>
    );
};
