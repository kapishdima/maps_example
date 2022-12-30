import { GetListFunction, ListResponse } from "shared/api";
import { PaginationT } from "../../hooks/usePagination";

export type GetImageFunction = GetListFunction<ListResponse<Image[]>>;

export type UploadFunction = (files: File) => Promise<Image>;
export type OnSelectFunction = (images: ImageT[]) => void;

export type GalleryContextT = {
    onSelectedImages: OnSelectFunction;
};
