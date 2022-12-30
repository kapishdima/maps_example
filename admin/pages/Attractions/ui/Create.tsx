import React from "react";

import {
    AttractionsServiceProvider,
    AttractionCreateContent,
} from "features/Attractions";

export const AttractionCreatePage: React.FC = () => {
    return (
        <AttractionsServiceProvider>
            <AttractionCreateContent />
        </AttractionsServiceProvider>
    );
};
