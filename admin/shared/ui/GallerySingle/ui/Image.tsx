import React, { useState } from "react";

import classNames from "classnames";
import LazyLoad from "react-lazyload";
import { observer } from "mobx-react";

import {
    CutIcon,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    SmallCrossIcon,
    SmallTickIcon,
} from "evergreen-ui";

import { Image } from "../model/image";
import { useGalleryStore } from "../hooks/useGalleryStore";
import { ImageEditor } from "features/ImageEditor/ImageEditor";

import "./gallery.scss";

type GalleryImageProps = {
    image: Image;
};

const width = majorScale(10);
const height = majorScale(10);

export const GalleryImage: React.FC<GalleryImageProps> = observer(
    ({ image }) => {
        const galleryStore = useGalleryStore();
        const placeholderRef = React.useRef<HTMLDivElement>();

        const [isEditerOpen, setEditorOpen] = useState(false);

        const isSelected = galleryStore.isSelected(image);

        const select = () => {
            galleryStore.select(image);
        };

        const unselect = () => {
            galleryStore.unselect();
        };

        const onLoad = () => {
            placeholderRef?.current?.remove();
        };

        const openEditor = () => {
            setEditorOpen(true);
        };
        const closeEditor = () => {
            setEditorOpen(false);
        };

        return (
            <Pane
                className={classNames("image", {
                    "image--selected": isSelected,
                })}
                key={`image-container-${image.url}`}
                width={width}
                height={height}
                borderRadius={minorScale(1)}
                overflow="hidden"
                position="relative"
                cursor="pointer"
            >
                <Pane
                    key={`image-container-placeholder-${image.url}`}
                    className="placeholder"
                    ref={placeholderRef}
                ></Pane>
                <Pane className="image--hovered">
                    <Pane display="flex" alignItems="center">
                        {isSelected ? (
                            <IconButton
                                size="small"
                                appearance="minimal"
                                onClick={unselect}
                                icon={SmallCrossIcon}
                            />
                        ) : (
                            <IconButton
                                size="small"
                                appearance="minimal"
                                onClick={select}
                                icon={SmallTickIcon}
                            />
                        )}
                        <IconButton
                            size="small"
                            appearance="minimal"
                            onClick={openEditor}
                            icon={CutIcon}
                        />
                    </Pane>
                </Pane>
                <LazyLoad height={height} once>
                    <img
                        key={`image-${image.url}`}
                        src={image.url}
                        style={{
                            width: "100%",
                            height,
                            objectFit: "cover",
                        }}
                        onLoad={onLoad}
                    />
                </LazyLoad>

                {isEditerOpen && (
                    <ImageEditor
                        isShown={isEditerOpen}
                        image={image}
                        closeEditor={closeEditor}
                    />
                )}
            </Pane>
        );
    }
);
