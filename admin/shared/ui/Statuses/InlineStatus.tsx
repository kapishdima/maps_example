import React from "react";
import { Badge, Heading, majorScale, StatusIndicator } from "evergreen-ui";
import { statusesColors } from "./model/statuses";

export type StatusTypes =
    | "unprocessed"
    | "accepted"
    | "rejected"
    | "draft"
    | "hidden";

export type StatusItem = {
    value: StatusTypes;
    label: string;
};

type StatusProps = {
    status: StatusItem;
};

export const InlineStatus: React.FC<StatusProps> = ({ status }) => {
    return <Badge color={statusesColors[status.value]}>{status.label}</Badge>;
};
