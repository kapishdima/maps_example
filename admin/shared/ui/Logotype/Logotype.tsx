import React from "react";

import { Pane } from "evergreen-ui";

import Logo from "shared/assets/images/logo.svg";

type LogotypeProps = {
    width?: string;
};

export const Logotype: React.FC<LogotypeProps> = ({ width }) => {
    return (
        <Pane width={width}>
            <img src={Logo} alt="SeaOfWine" style={{ width: "100%" }} />
        </Pane>
    );
};
