import React, { useEffect } from "react";
import { observer } from "mobx-react";

import { useFetchImages } from "../../hooks/useFetchImages";
import { useGalleryStore } from "../../hooks/useGalleryStore";

import { Image } from "../../model/image";
import { GetImageFunction } from "../../types";

type GalleryContextType = {
    images: Image[];
    isFetching: boolean;
    totalPages: number;
};

type GalleryManagerProps = {
    getImages: GetImageFunction;
    saveToForm: (images: Image) => void;
    name: string;
};

export const GalleryContext = React.createContext<GalleryContextType>(null);

export const GalleryManager: React.FC<GalleryManagerProps> = observer(
    ({ getImages, saveToForm, children, name }) => {
        const galleryStore = useGalleryStore();

        const {
            data: images,
            isFetching,
            totalPages,
        } = useFetchImages(name, getImages);

        const onSelectedImages = (image: Image) => {
            saveToForm(image);
        };

        useEffect(() => {
            if (isFetching) {
                return;
            }

            galleryStore.setImages(images);
        }, [images, isFetching]);

        useEffect(() => {
            onSelectedImages(galleryStore.selected);
        }, [galleryStore.selected]);

        return (
            <GalleryContext.Provider
                value={{
                    images,
                    isFetching,
                    totalPages,
                }}
            >
                {children}
            </GalleryContext.Provider>
        );
    }
);
