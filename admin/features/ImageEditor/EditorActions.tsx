import React from "react";

import { Pane, Button } from "evergreen-ui";
import { SaveButton } from "./SaveButton";

type EditorActionsProps = {
    editor: any;
    onSaveComplete: () => void;
};

export const EditorActions: React.FC<EditorActionsProps> = ({
    editor,
    onSaveComplete,
}) => {
    const getImageFile = async () => {
        if (!editor) {
            return;
        }

        const imageDataURL = editor.toDataURL();

        const blob = await (await fetch(imageDataURL)).blob();
        const file = new File([blob], "fileName.jpg", {
            type: "image/jpeg",
            lastModified: Date.now(),
        });

        return file;
    };

    return (
        <Pane className="editor-actions">
            <Button onClick={onSaveComplete}>Cancel</Button>
            <SaveButton
                getImageFile={getImageFile}
                onSaveComplete={onSaveComplete}
            />
        </Pane>
    );
};
