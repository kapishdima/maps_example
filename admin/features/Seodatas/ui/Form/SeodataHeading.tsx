import React from "react";
import { Heading, majorScale } from "evergreen-ui";
import { SeodataResponseEntity } from "entities/seodatas";
import { useCommonData, useCommonDataContext } from "app/hooks";

export type SeodataHeadingProps = {
    seodata: SeodataResponseEntity;
};

export const SeodataHeading: React.FC<SeodataHeadingProps> = ({ seodata }) => {
    const { generalLocale } = useCommonDataContext();

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {seodata.title[generalLocale.id]}
        </Heading>
    );
};
