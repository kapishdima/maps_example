import React from "react";
import { Heading, majorScale } from "evergreen-ui";
import { useCommonDataContext } from "app/hooks";
import { RegionDomainEntity, RegionResponseEntity } from "entities/region";

export type SeodataHeadingProps = {
    region: RegionResponseEntity;
};

export const RegionHeading: React.FC<SeodataHeadingProps> = ({ region }) => {
    const { generalLocale } = useCommonDataContext();

    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {region.translations[generalLocale.id].name}
        </Heading>
    );
};
