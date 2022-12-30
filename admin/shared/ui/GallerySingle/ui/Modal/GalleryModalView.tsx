import React from "react";

import { Dialog, Pane, majorScale } from "evergreen-ui";
import { Loading } from "shared/ui";
import { observer } from "mobx-react";

import { useGalleryManager } from "../../hooks/useGalleryManager";
import { useGalleryStore } from "../../hooks/useGalleryStore";

import { GalleryImage } from "../Image";
import { GalleryFooter } from "./GalleryFooter";

type GalleryModalViewProps = {
    isOpened: boolean;
    title?: string;
    onClose: () => void;
};

export const GalleryModalView: React.FC<GalleryModalViewProps> = observer(
    ({ isOpened, title, onClose }) => {
        const { isFetching, totalPages } = useGalleryManager();
        const galleryStore = useGalleryStore();

        const onSelectComplete = () => {
            onClose();
        };

        return (
            <Dialog
                isShown={isOpened}
                title={title || "Gallery"}
                onCloseComplete={onClose}
                hasFooter={false}
                preventBodyScrolling
                width="70vw"
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEscapePress={false}
            >
                {isFetching ? (
                    <Loading minHeight="100%" />
                ) : (
                    <Pane
                        display="flex"
                        flexWrap="wrap"
                        gap="8px"
                        maxHeight={majorScale(30)}
                        overflowY="auto"
                    >
                        {galleryStore.images?.map((image) => (
                            <GalleryImage key={image.id} image={image} />
                        ))}
                    </Pane>
                )}

                <GalleryFooter
                    totalPages={totalPages}
                    onSelectComplete={onSelectComplete}
                />
            </Dialog>
        );
    }
);
