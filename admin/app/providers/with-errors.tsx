import React from "react";

import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "app/errors/";

export const withErrors = (Component: React.ComponentType<any>) => () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Component />
        </ErrorBoundary>
    );
};
