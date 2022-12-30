import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Heading, majorScale, Menu, minorScale, Pane } from "evergreen-ui";

import { MenuItem } from "./types";

import { MenuHeader } from "./Header";
import { MenuFooter } from "./Footer";
import { User } from "features/User/ui/User";

interface AppMenuProps {
    items: MenuItem[];
    title?: string;
    activeItemTitle: string;
    onMenuItemClick: any;
}

export const AppMenu: React.FC<AppMenuProps> = ({
    items,
    title,
    activeItemTitle,
    onMenuItemClick,
}) => {
    const isActiveMenu = (item: MenuItem) => item.title === activeItemTitle;

    const activeItemStyle: React.CSSProperties = {
        background: "#F3F6FF",
        borderTopRightRadius: majorScale(2),
        borderBottomRightRadius: majorScale(2),
    };

    const defaultItemStyle: React.CSSProperties = {
        background: "transparent",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    };

    return (
        <Pane
            width="inherit"
            height="100vh"
            background="white"
            paddingY={majorScale(4)}
            paddingX={majorScale(2)}
            position="fixed"
            overflowY="auto"
            borderTopRightRadius={majorScale(2)}
        >
            <MenuHeader title={title} />

            <Menu>
                <Menu.Group title="Resources">
                    {items.length &&
                        items.map((menuItem) => (
                            <Menu.Item
                                is={Link}
                                to={menuItem.path}
                                key={`menu_${menuItem.title}`}
                                style={
                                    isActiveMenu(menuItem)
                                        ? activeItemStyle
                                        : defaultItemStyle
                                }
                                marginLeft={-minorScale(3)}
                                icon={menuItem.Icon || null}
                                marginY={majorScale(1)}
                                onSelect={() => onMenuItemClick(menuItem)}
                            >
                                {menuItem.title}
                            </Menu.Item>
                        ))}
                </Menu.Group>

                <Menu.Divider />

                <MenuFooter />
            </Menu>
        </Pane>
    );
};
