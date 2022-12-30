import React from "react";
import { MapInput } from "features/Map";
import { TabPane } from "shared/ui";
import { useControl } from "shared/hooks";

export const RouteInformation: React.FC = () => {
    const { getValues } = useControl();

    return (
        <TabPane tab="Route Information" index={2}>
            <MapInput />
        </TabPane>
    );
};
