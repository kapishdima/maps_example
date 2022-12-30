import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { WineryResponseEntity } from "entities/winery";
import { TranslationsService } from "processes/translations";

export type WineryHeadingProps = {
    winery: WineryResponseEntity;
};

export const WineryHeading: React.FC<WineryHeadingProps> = ({ winery }) => {
    const { generalLocale } = useCommonDataContext();
    const translations = TranslationsService.getTranslationFromGroup(
        winery.translations,
        generalLocale
    );

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {translations.name}
        </Heading>
    );
};
