import React from "react";

import { RegionsServiceProvider, RegionsEditContent } from "features/Regions";

export const RegionsEditPage: React.FC = () => {
    return (
        <RegionsServiceProvider>
            <RegionsEditContent />
        </RegionsServiceProvider>
    );
};
