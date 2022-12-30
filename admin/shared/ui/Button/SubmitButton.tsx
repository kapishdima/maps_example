import React from "react";

import { Button, ButtonProps } from "evergreen-ui";

type SubmitButtonProps = ButtonProps & {
    text?: string;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    text,
    ...props
}) => {
    return (
        <Button fontWeight="600" appearance="primary" type="submit" {...props}>
            {text || "Submit"}
        </Button>
    );
};
