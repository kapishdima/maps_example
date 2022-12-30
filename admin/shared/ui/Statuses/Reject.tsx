import React from "react";

import { Button, ButtonProps } from "evergreen-ui";

type RejectProps = ButtonProps & {
    text?: string;
    setStatus: (status: string) => void;
};

export const Reject: React.FC<RejectProps> = ({
    text,
    setStatus,
    ...props
}) => {
    const onClick = () => {
        setStatus("rejected");
    };

    return (
        <Button
            fontWeight="600"
            appearance="primary"
            intent="danger"
            type="submit"
            onClick={onClick}
            {...props}
        >
            {text || "Reject"}
        </Button>
    );
};
