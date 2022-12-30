import { Image } from "../model/image";

import { makeObservable, observable, action } from "mobx";
import { UploadFunction } from "../types";
import { isEqual } from "lodash";

export class GallerySingleStore {
    selected: Image = null;
    images: Image[] = [];

    constructor() {
        makeObservable(this, {
            selected: observable,
            images: observable,
            select: action("Set selected one Image"),
            unselect: action("Unselect image"),
            setImages: action("Set images from server"),
            setImage: action("Push single image to array of images"),
            upload: action("Upload image"),
        });
    }

    public isEmpty() {
        return Boolean(!this.images || !this.images.length);
    }

    public setImage(image: Image) {
        this.images.push(image);
    }

    public setImages(images: Image[]) {
        if (!images) {
            return;
        }
        this.images = images;
    }

    public getSelected() {
        return this.selected;
    }

    public select(image: Image) {
        if (isEqual(this.selected, image)) {
            return;
        }
        this.selected = image;
    }

    public upload(uploadFn: UploadFunction, file: File) {
        (uploadFn(file) as Promise<Image>).then((image) => {
            this.select(image);
            this.setImage(image);
        });
    }

    public unselect() {
        this.selected = null;
    }

    public isSelected(image: Image) {
        return this.selected?.id === image.id;
    }
}
