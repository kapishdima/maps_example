import React from "react";

import { Button, ButtonProps } from "evergreen-ui";

type AcceptProps = ButtonProps & {
    text?: string;
    setStatus: (status: string) => void;
};

export const Accept: React.FC<AcceptProps> = ({
    text,
    setStatus,
    ...props
}) => {
    const onClick = () => {
        setStatus("accepted");
    };

    return (
        <Button
            fontWeight="600"
            appearance="primary"
            intent="success"
            type="submit"
            onClick={onClick}
            {...props}
        >
            {text || "Publish"}
        </Button>
    );
};
