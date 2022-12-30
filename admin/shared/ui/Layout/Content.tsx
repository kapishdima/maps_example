import React from "react";

import { majorScale, Pane } from "evergreen-ui";
import { useLayoutDimensions } from "./hooks/useLayoutDimensions";

interface PageLayoutProps {
    header?: JSX.Element;
}

export const Content: React.FC<PageLayoutProps> = ({ children, header }) => {
    const { contentWidth, navbarWidth } = useLayoutDimensions();

    return (
        <Pane
            width={contentWidth - majorScale(3)}
            marginLeft={navbarWidth + majorScale(3)}
            paddingRight={majorScale(4)}
            marginRight={majorScale(4)}
        >
            {header || null}
            <Pane
                background="white"
                marginTop={majorScale(3)}
                padding={majorScale(3)}
                borderTopRightRadius={majorScale(2)}
                borderTopLeftRadius={majorScale(2)}
            >
                {children}
            </Pane>
        </Pane>
    );
};
