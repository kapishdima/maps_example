import React from "react";

import {
    SeodatasServiceProvider,
    SeodataCreateContent,
} from "features/Seodatas";

export const SeodataCreatePage: React.FC = () => {
    return (
        <SeodatasServiceProvider>
            <SeodataCreateContent />
        </SeodatasServiceProvider>
    );
};
