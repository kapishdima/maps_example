import React from "react";

import { CornerDialog, Heading } from "evergreen-ui";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallback: React.FC<FallbackProps> = ({
    error,
    resetErrorBoundary,
}) => {
    return (
        <CornerDialog
            title={
                <Heading is="h4" size={600} color="#D14343">
                    Something went wrong!
                </Heading>
            }
            isShown
            hasCancel={false}
            intent="danger"
            confirmLabel="Try again"
            onConfirm={resetErrorBoundary}
        >
            {error.message}
        </CornerDialog>
    );
};
