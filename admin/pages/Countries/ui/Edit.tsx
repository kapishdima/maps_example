import React from "react";

import {
    CountriesServiceProvider,
    CountryEditContent,
} from "features/Countries";

export const CountryEditPage: React.FC = () => {
    return (
        <CountriesServiceProvider>
            <CountryEditContent />
        </CountriesServiceProvider>
    );
};
