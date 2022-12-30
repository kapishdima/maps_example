import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { AgencyResponseEntity } from "entities/agencies";
import { TranslationsService } from "processes/translations";

export type AgencyHeadingProps = {
    agency: AgencyResponseEntity;
};

export const AgencyHeading: React.FC<AgencyHeadingProps> = ({ agency }) => {
    const { generalLocale } = useCommonDataContext();
    const translations = TranslationsService.getTranslationFromGroup(
        agency.translations,
        generalLocale
    );

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {translations.name}
        </Heading>
    );
};
