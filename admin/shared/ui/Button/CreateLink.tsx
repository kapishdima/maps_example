import React from "react";

import {
    Button,
    PlusIcon,
    ButtonProps,
    majorScale,
    minorScale,
} from "evergreen-ui";
import { Link } from "react-router-dom";

type CreateLinkProps = ButtonProps & {
    text?: string;
    to: string;
};

export const CreateLink: React.FC<CreateLinkProps> = (props) => {
    return (
        <Link
            to={props.to}
            style={{
                display: "flex",
                alignItems: "center",
                columnGap: majorScale(1),
                padding: "8px 16px",
                borderRadius: minorScale(1),
                textDecoration: "none",
                color: "#fff",
                fontWeight: 500,
                fontFamily: "Inter",
                fontSize: 12,
                backgroundColor: "#3366FF",
            }}
        >
            {props.text || "Create"}
            <PlusIcon size={minorScale(3)} />
        </Link>
    );
};
