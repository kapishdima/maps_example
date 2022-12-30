import { useList } from "shared/hooks";
import { Image } from "../model/image";
import { GetImageFunction } from "../types";

type UseFetchImagesResult = {
    data: Image[];
    totalPages: number;
    isFetching: boolean;
};

export const useFetchImages = (
    name: string,
    fetchImages: GetImageFunction
): UseFetchImagesResult => {
    const { data: media, isFetching } = useList<Image[]>(
        name,
        ({ page, size }) => fetchImages({ page, size })
    );

    return {
        data: media?.data,
        isFetching,
        totalPages: media?.meta.last_page,
    };
};
