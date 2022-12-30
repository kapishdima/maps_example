import React from "react";

import {
    AgenciesServiceProvider,
    AgencyCreateContent,
} from "features/Agencies";

export const AgencyCreatePage: React.FC = () => {
    return (
        <AgenciesServiceProvider>
            <AgencyCreateContent />
        </AgenciesServiceProvider>
    );
};
