import { includes } from "lodash";
import React, { useEffect, useState } from "react";
import { TabsContextType } from "./types";

export const TabsContext = React.createContext<TabsContextType>({
    selectedIndex: null,
    tabWithErrors: [],
});

type TabsProviderProps = {
    selectedIndex: number;
};

type ValidationTab = {
    name: string;
    isInvalid: boolean;
};

export const TabsProvider: React.FC<TabsProviderProps> = ({
    children,
    selectedIndex,
}) => {
    const [tabWithErrors, setTabWithErrors] = useState<ValidationTab[]>([]);

    const onTabWithError = (tab: ValidationTab) => {
        if (tabWithErrors.some(({ name }) => tab.name === name)) {
            if (tab.isInvalid) {
                return;
            }

            setTabWithErrors((tabs) =>
                tabs.filter(({ name }) => tab.name !== name)
            );
        }

        if (!tab.isInvalid) {
            return;
        }

        setTabWithErrors((tabs) => [...tabs, tab]);
    };

    return (
        <TabsContext.Provider
            value={{
                selectedIndex,
                tabWithErrors: tabWithErrors.map(({ name }) => name),
                onTabWithError,
            }}
        >
            {children}
        </TabsContext.Provider>
    );
};
