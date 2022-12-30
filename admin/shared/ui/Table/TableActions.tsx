import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
    EditIcon,
    IconButton,
    majorScale,
    Menu,
    MoreIcon,
    Popover,
    TrashIcon,
} from "evergreen-ui";

import { DeleteConfirm } from "shared/ui";
import { usePermission } from "processes/permissions";

type TableActionsProps = {
    onDelete?: () => void;
    editLink?: string;
    deletePermission?: string;
    editPermission?: string;
};

export const TableActions: React.FC<TableActionsProps> = ({
    editLink,
    onDelete,
    deletePermission,
    editPermission,
}) => {
    const [isShownDeleteConfirm, setIsShown] = useState(false);

    const allowDelete = usePermission(deletePermission);
    const allowEdit = usePermission(editPermission);

    if (!allowDelete && !allowEdit) {
        return null;
    }

    return (
        <>
            <Popover
                minWidth={150}
                content={
                    <Menu>
                        <Menu.Group title="Actions">
                            {allowEdit && (
                                <Menu.Item
                                    is={Link}
                                    to={editLink || "create"}
                                    height={majorScale(4)}
                                    icon={EditIcon}
                                >
                                    Edit
                                </Menu.Item>
                            )}
                            {allowDelete && (
                                <Menu.Item
                                    height={majorScale(4)}
                                    icon={TrashIcon}
                                    intent="danger"
                                    onClick={() => setIsShown(true)}
                                >
                                    Delete
                                </Menu.Item>
                            )}
                        </Menu.Group>
                    </Menu>
                }
            >
                <IconButton appearance="minimal" icon={<MoreIcon />} />
            </Popover>

            <DeleteConfirm
                isShown={isShownDeleteConfirm}
                onClose={() => setIsShown(false)}
                onDelete={onDelete}
            />
        </>
    );
};
