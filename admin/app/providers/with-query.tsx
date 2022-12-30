import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        },
    },
});

export const withQuery = (Component: React.ComponentType<any>) => () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Component />
        </QueryClientProvider>
    );
};
