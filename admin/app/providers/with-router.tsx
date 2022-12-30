import React from "react";

import { BrowserRouter } from "react-router-dom";

export const withRouter = (Component: React.ComponentType<any>) => () => {
    return (
        <BrowserRouter basename="panels">
            <Component />
        </BrowserRouter>
    );
};
