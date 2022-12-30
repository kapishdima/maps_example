import React from "react";

import { Pane } from "evergreen-ui";

import { MapInput } from "features/Map";
import { TabPane } from "shared/ui";

export const BlackSeaRouteInfo: React.FC = () => {
    return (
        <TabPane index={1} tab="Black Sea Route">
            <Pane width="100%">
                <MapInput />
            </Pane>
        </TabPane>
    );
};
