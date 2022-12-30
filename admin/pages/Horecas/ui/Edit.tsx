import React from "react";

import { HorecaServiceProvider, HorecaEditContent } from "features/Horeca";

export const HorecaEditPage: React.FC = () => {
    return (
        <HorecaServiceProvider>
            <HorecaEditContent />
        </HorecaServiceProvider>
    );
};
