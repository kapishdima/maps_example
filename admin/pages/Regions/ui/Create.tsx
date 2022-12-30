import React from "react";

import { RegionsServiceProvider, RegionCreateContent } from "features/Regions";

export const RegionsCreatePage: React.FC = () => {
    return (
        <RegionsServiceProvider>
            <RegionCreateContent />
        </RegionsServiceProvider>
    );
};
