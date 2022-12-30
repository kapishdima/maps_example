import React from "react";

import { Button } from "evergreen-ui";
import { useCreateMedia } from "processes/media";
import { useGalleryStore, Image } from "shared/ui";

type SaveButtonProps = {
    onSaveComplete: () => void;
    getImageFile: () => Promise<File>;
};

export const SaveButton: React.FC<SaveButtonProps> = ({
    onSaveComplete,
    getImageFile,
}) => {
    const galleryStore = useGalleryStore();
    const { createMedia, isLoading } = useCreateMedia();

    const saveImage = async () => {
        const imageFile = await getImageFile();
        const media = await createMedia(imageFile);

        if (media) {
            const mediaToStore: Image = {
                id: media.id,
                url: media.path,
            };

            galleryStore.setImage(mediaToStore);
            onSaveComplete();
        }
    };
    return (
        <Button appearance="primary" onClick={saveImage} isLoading={isLoading}>
            Save image
        </Button>
    );
};
