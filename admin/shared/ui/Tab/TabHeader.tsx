import React from "react";
import classNames from "classnames";

import { majorScale, Tablist, Tab, TabProps as TabUIProps } from "evergreen-ui";
import { Tab as TabT, TabProps } from "./types";

export type TabAppearance = "primary" | "secondary";

import "./tabs.scss";
import { useTab } from "shared/hooks";

type TabHeaderProps = TabProps & {
    tabs: TabT[];
    style?: React.CSSProperties;
    appearance?: TabAppearance;
};

export const TabHeader: React.FC<TabHeaderProps> = ({
    tabs,
    onSelect,
    selectedIndex,
    style,
    appearance,
}) => {
    const { tabWithErrors } = useTab();
    return (
        <Tablist marginBottom={majorScale(2)} style={style}>
            {tabs.map((tab, index) => {
                const isInvalidTab = tabWithErrors.includes(tab);
                return (
                    <Tab
                        key={tab}
                        id={tab}
                        onSelect={() => onSelect(index)}
                        isSelected={index === selectedIndex}
                        aria-controls={`panel-${tab}`}
                        appearance={appearance}
                        className={classNames({
                            "primary-invalid-tab":
                                appearance === "primary" && isInvalidTab,
                            "secondary-invalid-tab":
                                appearance !== "primary" && isInvalidTab,
                        })}
                    >
                        {tab}
                    </Tab>
                );
            })}
        </Tablist>
    );
};
