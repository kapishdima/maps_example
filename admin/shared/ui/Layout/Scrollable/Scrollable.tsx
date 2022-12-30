import React from "react";

import { BoxComponent, majorScale, Pane, PaneOwnProps } from "evergreen-ui";

import "./scrollable.scss";

type ScrollableProps = {};

export const Scrollable: React.FC<ScrollableProps> = ({ children }) => {
    return (
        <Pane
            display="flex"
            className="scrollable-row"
            columnGap={majorScale(1)}
        >
            {children}
        </Pane>
    );
};
