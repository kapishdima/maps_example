import React from "react";

import {
    WineriesServiceProvider,
    WineryCreateContent,
} from "features/Wineries";

export const WineryCreatePage: React.FC = () => {
    return (
        <WineriesServiceProvider>
            <WineryCreateContent />
        </WineriesServiceProvider>
    );
};
