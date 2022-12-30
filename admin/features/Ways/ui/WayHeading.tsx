import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { WayResponseEntity } from "entities/ways";
import { TranslationsService } from "processes/translations";
import { LocationViewEntity } from "entities/location";

export type WayHeadingProps = {
    way: WayResponseEntity<LocationViewEntity[]>;
};

export const WayHeading: React.FC<WayHeadingProps> = ({ way }) => {
    const { generalLocale } = useCommonDataContext();
    const translations = TranslationsService.getTranslationFromGroup(
        way.translations,
        generalLocale
    );

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {translations.name}
        </Heading>
    );
};
