export type Tab = string;
export type ValidationTab = {
    name: string;
    isInvalid: boolean;
};

export type TabProps = {
    onSelect?: (index: number) => void;
    selectedIndex?: number;
};

export type TabsContextType = {
    selectedIndex: number;
    tabWithErrors?: string[];
    onTabWithError?: (tab: ValidationTab) => void;
};
