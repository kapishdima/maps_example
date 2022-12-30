import React from "react";

import { SeodatasServiceProvider, SeodataEditContent } from "features/Seodatas";

export const SeodataEditPage: React.FC = () => {
    return (
        <SeodatasServiceProvider>
            <SeodataEditContent />
        </SeodatasServiceProvider>
    );
};
