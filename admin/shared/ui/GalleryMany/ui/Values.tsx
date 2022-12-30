import React from "react";

import { observer } from "mobx-react";

import {
    ArrowLeftIcon,
    ArrowRightIcon,
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

    const moveRigth = (from: number) => {
        const to = from + 1;
        galleryStore.move(from, to);
    };

    const moveLeft = (from: number) => {
        const to = from - 1;
        galleryStore.move(from, to);
    };

    const deleteImage = (image) => {
        galleryStore.unselect(image);
    };

    if (!galleryStore.selected.length) {
        return null;
    }

    return (
        <Pane marginTop={majorScale(2)}>
            <Heading size={100} marginBottom={majorScale(1)}>
                Selected images
            </Heading>

            <Pane display="flex" alignItems="center" columnGap={majorScale(1)}>
                {galleryStore.selected.map((image, index) => (
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
                                    disabled={index === 0}
                                    onClick={() => {
                                        moveLeft(index);
                                        close();
                                    }}
                                    appearance="minimal"
                                    icon={ArrowLeftIcon}
                                />
                                <IconButton
                                    disabled={
                                        index ===
                                        galleryStore.selected.length - 1
                                    }
                                    onClick={() => {
                                        moveRigth(index);
                                        close();
                                    }}
                                    appearance="minimal"
                                    icon={ArrowRightIcon}
                                />

                                <IconButton
                                    onClick={() => {
                                        deleteImage(image);
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
                                src={image?.url}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Pane>
                    </Popover>
                ))}
            </Pane>
        </Pane>
    );
});
