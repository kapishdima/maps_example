import React from "react";
import { usePermission } from "../hooks/usePermission";

export type RestrictedProps = {
    to: string;
};

export const Restricted: React.FC<RestrictedProps> = ({ to, children }) => {
    const allowed = usePermission(to);

    if (!allowed) {
        return null;
    }

    return <>{children}</>;
};
