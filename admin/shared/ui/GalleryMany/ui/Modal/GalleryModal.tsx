import React, { useState } from "react";

import { Button, majorScale, Pane } from "evergreen-ui";
import { observer } from "mobx-react";

import { GalleryModalView } from "./GalleryModalView";

type GalleryModalProps = {
    title?: string;
};

export const GalleryModal: React.FC<GalleryModalProps> = ({ title }) => {
    const [isOpened, setIsOpened] = useState(false);

    const onOpen = () => {
        setIsOpened(true);
    };

    const onClose = () => {
        setIsOpened(false);
    };

    return (
        <>
            <Pane display="flex" justifyContent="center">
                <Button
                    appearance="default"
                    intent="none"
                    type="button"
                    onClick={onOpen}
                    marginRight={majorScale(1)}
                >
                    Select from uploaded
                </Button>
            </Pane>
            {isOpened && (
                <GalleryModalView
                    isOpened={isOpened}
                    title={title}
                    onClose={onClose}
                />
            )}
        </>
    );
};
