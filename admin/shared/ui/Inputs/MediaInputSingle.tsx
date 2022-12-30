import React from "react";

import { MediaDomainEnity, useCreateMedia, useMedia } from "processes/media";

import { useControl } from "shared/hooks";
import { ListResponse } from "shared/api";
import { GalleryInputSingle } from "shared/ui";

import { Image } from "../GalleryMany/model/image";
import { FormFieldProps } from "evergreen-ui";

type MediaInputProps = FormFieldProps & {
    name?: string;
    required?: boolean;
};

export const MediaInputSingle: React.FC<MediaInputProps> = ({
    name,
    label,
    required,
}) => {
    const mediaService = useMedia();
    const { setValue } = useControl();

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

    const saveToForm = (image: Image) => {
        if (!image?.id || !image?.url) {
            return;
        }
        setValue(name, image.id);
    };

    return (
        <GalleryInputSingle
            required={required}
            label={label}
            getImages={getImages}
            upload={upload}
            name={name}
            buttonText="Select media"
            saveToForm={saveToForm}
        />
    );
};
