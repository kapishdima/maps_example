import { Badge, CrossIcon, majorScale, minorScale } from "evergreen-ui";
import React from "react";

type TagProps = {
    onRemove: () => void;
};

export const Tag: React.FC<TagProps> = ({ onRemove, children }) => {
    const badgeStyles = {
        alignItems: "center",
        display: "inline-flex",
        fontWeight: 400,
        borderRadius: 4,
        paddingX: 8,
        paddingY: 6,
        marginTop: 0,
        marginBottom: 0,
    };

    return (
        <Badge
            isInteractive
            {...badgeStyles}
            height={majorScale(3)}
            textTransform="none"
            marginY={minorScale(1)}
            marginX={minorScale(1)}
        >
            {children}
            <CrossIcon
                marginLeft={minorScale(1)}
                onClick={onRemove}
                size={minorScale(3)}
            />
        </Badge>
    );
};
