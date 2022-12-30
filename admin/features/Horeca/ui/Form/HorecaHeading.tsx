import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { HorecaResponseEntity } from "entities/horeca";
import { TranslationsService } from "processes/translations";

export type HorecaHeadingProps = {
    horeca: HorecaResponseEntity;
};

export const HorecaHeading: React.FC<HorecaHeadingProps> = ({ horeca }) => {
    const { generalLocale } = useCommonDataContext();
    const translations = TranslationsService.getTranslationFromGroup(
        horeca.translations,
        generalLocale
    );

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {translations.name}
        </Heading>
    );
};
