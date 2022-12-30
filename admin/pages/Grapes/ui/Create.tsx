import React from "react";

import { GrapesServiceProvider, GrapeCreateContent } from "features/Grapes";

export const GrapeCreatePage: React.FC = () => {
    return (
        <GrapesServiceProvider>
            <GrapeCreateContent />
        </GrapesServiceProvider>
    );
};
