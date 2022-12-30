import React from "react";

export type IconType = false | JSX.Element | React.ElementType<any>;

export type MenuItem = {
    title: string;
    Icon?: React.ComponentType;
    path: string;
};
