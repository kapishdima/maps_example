import React from "react";

import { Button, ButtonProps } from "evergreen-ui";

type SaveToDraftProps = ButtonProps & {
    text?: string;
    setStatus: (status: string) => void;
};

export const SaveToDraft: React.FC<SaveToDraftProps> = ({
    text,
    setStatus,
    ...props
}) => {
    const onClick = () => {
        setStatus("draft");
    };

    return (
        <Button
            fontWeight="600"
            appearance="minimal"
            intent="none"
            type="submit"
            onClick={onClick}
            {...props}
        >
            {text || "Save to draft"}
        </Button>
    );
};
