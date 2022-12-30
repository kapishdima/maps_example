import React from "react";

import { Heading, majorScale } from "evergreen-ui";

export type BlackSeaHeadingProps = {
    blackSea: any;
};

export const BlackSeaHeading: React.FC<BlackSeaHeadingProps> = ({
    blackSea,
}) => {
    return (
        <Heading size={700} marginRight={majorScale(3)}>
            Black sea information
        </Heading>
    );
};
