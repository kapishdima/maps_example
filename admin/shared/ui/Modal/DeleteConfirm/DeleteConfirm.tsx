import React, { useState } from "react";

import { Dialog } from "evergreen-ui";

type DeleteConfirmProps = {
    title?: string;
    isShown: boolean;
    onClose: () => void;
    onDelete: () => void;
};

export const DeleteConfirm: React.FC<DeleteConfirmProps> = ({
    isShown,
    onDelete,
    onClose,
}) => {
    const [loading, setLoading] = useState(false);

    const onDeleteConfirmed = async () => {
        try {
            setLoading(true);
            await onDelete();
            setLoading(false);
            onClose();
        } catch (error) {
            setLoading(false);
            onClose();
        }
    };

    return (
        <Dialog
            isShown={isShown}
            title="Are you sure you want to delete this item?"
            intent="danger"
            onConfirm={onDeleteConfirmed}
            isConfirmLoading={loading}
            minHeightContent={0}
            confirmLabel="Delete"
        >
            <></>
        </Dialog>
    );
};
