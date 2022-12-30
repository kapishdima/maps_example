import React, { useEffect, useState } from "react";

import { observer } from "mobx-react";

import {
    Heading,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    Popover,
    TrashIcon,
} from "evergreen-ui";

import { useGalleryStore } from "../hooks/useGalleryStore";

type GalleryValuesProps = {};

export const GalleryValues: React.FC<GalleryValuesProps> = observer(() => {
    const galleryStore = useGalleryStore();

    const deleteImage = () => {
        galleryStore.unselect();
    };

    if (!galleryStore.selected) {
        return null;
    }

    return (
        <Pane marginTop={majorScale(2)}>
            <Heading size={100} marginBottom={majorScale(1)}>
                Selected images
            </Heading>

            <Pane display="flex" alignItems="center" columnGap={majorScale(1)}>
                <Popover
                    bringFocusInside
                    content={({ close }) => (
                        <Pane
                            width="100%"
                            padding={majorScale(1)}
                            display="flex"
                            alignItems="center"
                        >
                            <IconButton
                                onClick={() => {
                                    deleteImage();
                                    close();
                                }}
                                appearance="minimal"
                                intent="danger"
                                icon={TrashIcon}
                            />
                        </Pane>
                    )}
                >
                    <Pane
                        width={majorScale(5)}
                        height={majorScale(5)}
                        borderRadius={minorScale(1)}
                        overflow="hidden"
                        cursor="pointer"
                    >
                        <img
                            src={galleryStore.selected?.url}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Pane>
                </Popover>
            </Pane>
        </Pane>
    );
});
