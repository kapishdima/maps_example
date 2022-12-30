import React from "react";

import { Button, ButtonProps } from "evergreen-ui";
import { useAuthStore } from "processes/auth";

type SaveProps = ButtonProps & {
    text?: string;
    setStatus: (status: string) => void;
};

export const Save: React.FC<SaveProps> = ({ text, setStatus, ...props }) => {
    const { user } = useAuthStore();

    const onClick = () => {
        setStatus("unprocessed");
    };

    if (user.role === "superadmin") {
        return null;
    }

    return (
        <Button
            fontWeight="600"
            appearance="primary"
            type="submit"
            onClick={onClick}
            {...props}
        >
            {text || "Save for moderation"}
        </Button>
    );
};
