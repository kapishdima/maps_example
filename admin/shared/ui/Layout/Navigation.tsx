import React, { useState } from "react";

import { Outlet, useLocation } from "react-router-dom";
import {
    AirplaneIcon,
    ChatIcon,
    DocumentIcon,
    Pane,
    RouteIcon,
    TimelineEventsIcon,
    SettingsIcon,
    OfficeIcon,
    GlassIcon,
    MapMarkerIcon,
    UserIcon,
    FlagIcon,
    InfoSignIcon,
    GeolocationIcon,
} from "evergreen-ui";

import { AppMenu } from "shared/ui/Menu/Menu";
import { useAuthStore } from "processes/auth";
import { usePermission } from "processes/permissions";

import { useLayoutDimensions } from "./hooks/useLayoutDimensions";

type NavigationProps = {};

const createMenu = (user) => [
    { title: "Wineries", path: "wineries", Icon: GlassIcon },
    { title: "HoReCa", path: "horecas", Icon: OfficeIcon },
    { title: "Attractions", path: "attractions", Icon: MapMarkerIcon },
    { title: "Routes", path: "ways", Icon: RouteIcon },
    { title: "Events", path: "events", Icon: TimelineEventsIcon },
    { title: "Travel Agencies", path: "agencies", Icon: AirplaneIcon },
    { title: "Reviews", path: "reviews", Icon: ChatIcon },
    {
        title: "Articles",
        path: "articles",
        Icon: DocumentIcon,
        action: "blog.read",
    },
    { title: "Admins", path: "admins", Icon: UserIcon, action: "admins.read" },
    {
        title: "Regions",
        path: "regions",
        Icon: GeolocationIcon,
        action: "regions.read",
    },
    { title: "Grape Varieties", path: "grapeVarieties", Icon: InfoSignIcon },
    {
        title: "Seodata",
        path: "seodatas",
        Icon: UserIcon,
        action: "seodata.allActions",
    },
    {
        title: "Settings",
        path: "settings/1",
        Icon: SettingsIcon,
        action: "settings.allActions",
    },
    {
        title: "Black Sea",
        path: "black-sea",
        Icon: SettingsIcon,
        action: "settings.blackSea",
    },
    {
        title: user?.role !== "superadmin" ? "Country" : "Countries",
        path:
            user?.role !== "superadmin"
                ? `countries/${user?.countryId}`
                : "countries",
        Icon: FlagIcon,
    },
];

export const Navigation: React.FC<NavigationProps> = () => {
    const { navbarWidth } = useLayoutDimensions();
    const { user } = useAuthStore();
    const menu = createMenu(user);
    const location = useLocation();

    const activeMenu = menu.find((item) =>
        location.pathname.includes(item.path)
    );

    const [activeMenuItem, setActiveMenuItem] = useState(activeMenu || menu[0]);
    const onMenuItemClick = (menuItem) => {
        if (menuItem.title === activeMenuItem.title) {
            return;
        }
        setActiveMenuItem(menuItem);
    };
    return (
        <Pane width={navbarWidth} position="absolute">
            <AppMenu
                items={menu.filter(
                    (item) => !item.action || usePermission(item.action)
                )}
                activeItemTitle={activeMenuItem.title}
                onMenuItemClick={onMenuItemClick}
                title="Sea Of Wine"
            />
            <Outlet />
        </Pane>
    );
};
