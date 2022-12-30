import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { CountryResponseEntity } from "entities/countries";
import { TranslationsService } from "processes/translations";

export type CountryHeadingProps = {
    country: CountryResponseEntity;
};

export const CountryHeading: React.FC<CountryHeadingProps> = ({ country }) => {
    const { generalLocale } = useCommonDataContext();
    const translations = TranslationsService.getTranslationFromGroup(
        country.translations,
        generalLocale
    );

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {translations.name}
        </Heading>
    );
};
