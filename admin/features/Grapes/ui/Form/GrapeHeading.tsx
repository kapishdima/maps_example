import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { GrapeResponseEntity } from "entities/grapes";
import { TranslationsService } from "processes/translations";

export type GrapeHeadingProps = {
    grape: GrapeResponseEntity;
};

export const GrapeHeading: React.FC<GrapeHeadingProps> = ({ grape }) => {
    const { generalLocale } = useCommonDataContext();
    const translations = TranslationsService.getTranslationFromGroup(
        grape.translations,
        generalLocale
    );

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {translations.name}
        </Heading>
    );
};
