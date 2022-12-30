import React from "react";

import { Heading, majorScale, Pane, Paragraph, Spinner } from "evergreen-ui";

type LoadingProps = {
    minHeight?: string;
    minWidth?: string;
    title?: string;
    description?: string;
    forwardFront?: boolean;
};

export const Loading: React.FC<LoadingProps> = ({
    minHeight,
    minWidth,
    title,
    description,
    forwardFront,
}) => {
    return (
        <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={10}
            position="relative"
            backgroundColor={forwardFront ? "#fff" : ""}
            minHeight={minHeight || "50vh"}
            minWidth={minWidth}
        >
            <Pane display="flex" flexDirection="column" alignItems="center">
                <Spinner size={24} />
                <Pane>
                    {title && (
                        <Heading marginTop={majorScale(2)} size={100}>
                            {title}
                        </Heading>
                    )}
                    {description && (
                        <Paragraph marginTop={majorScale(1)}>
                            {description}
                        </Paragraph>
                    )}
                </Pane>
            </Pane>
        </Pane>
    );
};
