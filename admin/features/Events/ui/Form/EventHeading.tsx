import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { EventResponseEntity } from "entities/events";
import { TranslationsService } from "processes/translations";

export type EventHeadingProps = {
    event: EventResponseEntity;
};

export const EventHeading: React.FC<EventHeadingProps> = ({ event }) => {
    const { generalLocale } = useCommonDataContext();
    const translations = TranslationsService.getTranslationFromGroup(
        event.translations,
        generalLocale
    );

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {translations.name}
        </Heading>
    );
};
