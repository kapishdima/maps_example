import React from "react";

import { HorecaServiceProvider, HorecaCreateContent } from "features/Horeca";

export const HorecaCreatePage: React.FC = () => {
    return (
        <HorecaServiceProvider>
            <HorecaCreateContent />
        </HorecaServiceProvider>
    );
};
