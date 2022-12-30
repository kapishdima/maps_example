import React from "react";

import { GrapesServiceProvider, GrapeEditContent } from "features/Grapes";

export const GrapeEditPage: React.FC = () => {
    return (
        <GrapesServiceProvider>
            <GrapeEditContent />
        </GrapesServiceProvider>
    );
};
