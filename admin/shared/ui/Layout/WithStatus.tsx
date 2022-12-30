import React from "react";

import { Pane } from "evergreen-ui";
import { InlineStatus, StatusItem } from "shared/ui";

type WithStatusProps = {
    status: StatusItem;
};

export const WithStatus: React.FC<WithStatusProps> = ({ status, children }) => {
    return (
        <Pane display="flex" alignContent="center">
            {children}
            <InlineStatus status={status} />
        </Pane>
    );
};
