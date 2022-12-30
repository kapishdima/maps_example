import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { AttractionResponseEntity } from "entities/attractions";
import { TranslationsService } from "processes/translations";

export type AttractionHeadingProps = {
    attraction: AttractionResponseEntity;
};

export const AttractionHeading: React.FC<AttractionHeadingProps> = ({
    attraction,
}) => {
    const { generalLocale } = useCommonDataContext();
    const translations = TranslationsService.getTranslationFromGroup(
        attraction.translations,
        generalLocale
    );

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {translations.name}
        </Heading>
    );
};
