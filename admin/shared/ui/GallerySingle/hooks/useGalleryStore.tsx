import React from "react";

import { GalleryStoreContext } from "../lib/providers/GalleryStoreProvider";

export const useGalleryStore = () => {
    const galleryStore = React.useContext(GalleryStoreContext);

    return galleryStore;
};
