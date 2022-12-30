import React from "react";

import { AgenciesServiceProvider, AgencyEditContent } from "features/Agencies";

export const AgencyEditPage: React.FC = () => {
    return (
        <AgenciesServiceProvider>
            <AgencyEditContent />
        </AgenciesServiceProvider>
    );
};
