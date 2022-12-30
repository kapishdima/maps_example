import React from "react";

import { TabsContext } from "shared/ui/Tab/TabsProvider";

export const useTab = () => {
    const context = React.useContext(TabsContext);

    if (!context) {
        throw new Error("useTab must be used within a Tab");
    }
    return context;
};
