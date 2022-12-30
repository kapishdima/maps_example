import React from "react";

import { Button, ButtonProps } from "evergreen-ui";

type HideProps = ButtonProps & {
    text?: string;
    setStatus: (status: string) => void;
};

export const Hide: React.FC<HideProps> = ({ text, setStatus, ...props }) => {
    const onClick = () => {
        setStatus("hidden");
    };

    return (
        <Button
            fontWeight="600"
            appearance="default"
            intent="none"
            type="submit"
            onClick={onClick}
            {...props}
        >
            {text || "Hide post"}
        </Button>
    );
};
