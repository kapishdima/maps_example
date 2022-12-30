import React from "react";

import {
    SettingsServiceProvider,
    SettingsEditContent,
} from "features/Settings";

export const SettingsEditPage: React.FC = () => {
    return (
        <SettingsServiceProvider>
            <SettingsEditContent />
        </SettingsServiceProvider>
    );
};
