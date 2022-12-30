import { majorScale, minorScale, Pane } from "evergreen-ui";
import React from "react";

export const TagBox = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<any>
>(({ children }, ref) => {
    return (
        <Pane
            ref={ref}
            display="flex"
            flexWrap="wrap"
            minHeight={majorScale(4)}
            height="100%"
            borderRadius={minorScale(1)}
            border="1px solid #d8dae5"
            paddingLeft={minorScale(3)}
        >
            {children}
        </Pane>
    );
});
