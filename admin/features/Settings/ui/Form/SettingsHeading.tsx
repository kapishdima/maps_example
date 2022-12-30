import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { SettingsResponseEntity } from "entities/settings";
import { TranslationsService } from "processes/translations";

export type SettingsHeadingProps = {
    settings: any;
};

export const SettingsHeading: React.FC<SettingsHeadingProps> = ({
    settings,
}) => {
    const { generalLocale } = useCommonDataContext();

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            Site Settings
        </Heading>
    );
};
