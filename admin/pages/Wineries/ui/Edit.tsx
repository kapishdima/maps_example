import React from "react";

import { WineriesServiceProvider, WineryEditContent } from "features/Wineries";

export const WineryEditPage: React.FC = () => {
    return (
        <WineriesServiceProvider>
            <WineryEditContent />
        </WineriesServiceProvider>
    );
};
