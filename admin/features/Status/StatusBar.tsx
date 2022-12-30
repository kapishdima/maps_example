import React from "react";

import { majorScale, Pane } from "evergreen-ui";

import { useControl } from "shared/hooks";
import { statuses } from "shared/ui";

import { Restricted } from "processes/permissions";

type StatusBarProps = {
    actions?: Array<keyof typeof statuses>;
    only?: Array<keyof typeof statuses>;
};

export const StatusBar: React.FC<StatusBarProps> = ({
    actions = ["saveAndPublish", "saveToDraft", "accept", "reject"],
    only = ["saveAndPublish", "saveToDraft", "accept", "reject"],
}) => {
    const { setValue } = useControl();
    const buttons = only
        ? actions.filter((action) => only.includes(action))
        : actions;

    const setStatus = (status: string) => {
        setValue("status", status);
    };

    return (
        <Pane
            marginTop={"70px"}
            maxWidth="45%"
            display="flex"
            justifyContent="flex-start"
            columnGap={majorScale(1)}
        >
            {buttons.map((action, index) => {
                const { Component, permission } = statuses[action];
                return (
                    <Restricted key={`${action}-${index}`} to={permission}>
                        <Component setStatus={setStatus} />
                    </Restricted>
                );
            })}
        </Pane>
    );
};
