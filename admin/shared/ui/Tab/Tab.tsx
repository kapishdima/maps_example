import React, { useState } from "react";

import { Pane } from "evergreen-ui";

import { TabAppearance, TabHeader } from "./TabHeader";
import { Tab } from "./types";

import { TabsProvider } from "./TabsProvider";

type TabsProps = {
    tabs: Tab[];
    style?: React.CSSProperties;
    appearance?: TabAppearance;
};

export const Tabs: React.FC<TabsProps> = ({
    tabs,
    children,
    style,
    appearance,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Pane>
            <TabsProvider selectedIndex={selectedIndex}>
                <TabHeader
                    tabs={tabs}
                    onSelect={onSelect}
                    selectedIndex={selectedIndex}
                    style={style}
                    appearance={appearance}
                />
                {children}
            </TabsProvider>
        </Pane>
    );
};
