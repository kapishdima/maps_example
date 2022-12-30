import { autorun } from "mobx";
import React from "react";

import { GallerySingleStore } from "../../store/gallery.store";

export const GalleryStoreContext =
    React.createContext<GallerySingleStore>(null);

export const GalleryStoreProvider: React.FC = ({ children }) => {
    const galleryStore = new GallerySingleStore();

    return (
        <GalleryStoreContext.Provider value={galleryStore}>
            {children}
        </GalleryStoreContext.Provider>
    );
};
