import React from "react";

import {
    AttractionsServiceProvider,
    AttractionEditContent,
} from "features/Attractions";

export const AttractionEditPage: React.FC = () => {
    return (
        <AttractionsServiceProvider>
            <AttractionEditContent />
        </AttractionsServiceProvider>
    );
};
