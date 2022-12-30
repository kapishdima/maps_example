import { useContext } from "react";
import { GalleryContext } from "../lib/providers/GalleryManager";

export const useGalleryManager = () => {
    return useContext(GalleryContext);
};
