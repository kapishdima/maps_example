import React, { useState } from "react";

import { Button, Heading, Pane } from "evergreen-ui";
import { Card } from "shared/ui";

import classNames from "classnames";

import "./unmoderated-card.scss";

type UnmoderatedCardProps = {
    title: string;
    count: number;
};

export const UnmoderatedCard: React.FC<UnmoderatedCardProps> = ({
    title,
    count,
}) => {
    const [actionsVisible, setActionsVisible] = useState(false);

    return (
        <Card
            onMouseEnter={() => setActionsVisible(true)}
            onMouseLeave={() => setActionsVisible(false)}
        >
            <Pane
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Heading size={800} color="#3366FF">
                    {count}
                </Heading>
                <Heading
                    className={classNames("unmoderated-title", {
                        "unmoderated-title--hidden": actionsVisible,
                    })}
                    size={400}
                >
                    {title}
                </Heading>

                <Pane
                    className={classNames("unmoderated-actions", {
                        "unmoderated-actions--visible": actionsVisible,
                    })}
                >
                    <Button appearance="primary">View</Button>
                </Pane>
            </Pane>
        </Card>
    );
};
