import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { useCommonDataContext } from "app/hooks";
import { AdminResponseEntity } from "entities/admins";

export type AdminHeadingProps = {
    admin: AdminResponseEntity;
};

export const AdminHeading: React.FC<AdminHeadingProps> = ({ admin }) => {
    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {admin.name}
        </Heading>
    );
};
