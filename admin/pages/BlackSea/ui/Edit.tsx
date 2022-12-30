import React from "react";

import {
    BlackSeaServiceProvider,
    BlackSeaEditContent,
} from "features/BlackSea";

export const BlackSeaEditPage: React.FC = () => {
    return (
        <BlackSeaServiceProvider>
            <BlackSeaEditContent />
        </BlackSeaServiceProvider>
    );
};
