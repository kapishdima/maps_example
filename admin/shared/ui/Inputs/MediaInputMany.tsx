import React from "react";

import { MediaDomainEnity, useCreateMedia, useMedia } from "processes/media";

import { useControl } from "shared/hooks";
import { ListResponse } from "shared/api";

import { GalleryInputMany } from "shared/ui";
import { Image } from "../GalleryMany/model/image";

type MediaInputProps = {
    name?: string;
    maxFiles?: number;
    required?: boolean;
};

export const MediaInputMany: React.FC<MediaInputProps> = ({
    name,
    required,
}) => {
    const mediaService = useMedia();
    const { setValue } = useControl();

    const inputName = name || "media";

    const getImages = async ({
        page,
        size,
    }): Promise<ListResponse<Image[]>> => {
        const { data: media, meta } = await mediaService.getMedia({
            page,
            size,
        });

        return {
            data: (media as MediaDomainEnity[]).map((media) => ({
                id: media.id,
                url: media.path,
            })),
            meta,
        };
    };

    const upload = async (file: File): Promise<Image> => {
        const image = await mediaService.createMedia({ file });

        return { id: image.id, url: image.path };
    };

    const saveToForm = (images: Image[]) => {
        setValue(
            inputName,
            images.map((image, index) => ({
                order: index,
                id: image.id,
                url: image.url,
            }))
        );
    };

    return (
        <GalleryInputMany
            required={required}
            getImages={getImages}
            upload={upload}
            name={inputName}
            buttonText="Select media"
            saveToForm={saveToForm}
        />
    );
};
