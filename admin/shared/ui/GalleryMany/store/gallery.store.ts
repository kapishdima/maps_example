import { Image } from "../model/image";

import {
    makeObservable,
    observable,
    action,
    runInAction,
    makeAutoObservable,
} from "mobx";
import { UploadFunction } from "../types";
import { makeLoggable } from "mobx-log";
import { intersection, without } from "lodash";

export class GalleryManyStore {
    selected: Image[] = [];
    images: Image[] = [];

    constructor() {
        makeObservable(this, {
            selected: observable,
            images: observable,
            select: action("Set selected one Image"),
            unselect: action("Unselect image"),
            setImages: action("Set images from server"),
            setImage: action("Push single image to array of images"),
            move: action("Replace images in selected array"),
            upload: action("Upload image"),
        });
        // makeLoggable(this);
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
        if (this.isExist(image)) {
            return;
        }
        this.selected.push(image);
    }

    public upload(uploadFn: UploadFunction, files: File[]) {
        Promise.all(files.map((file) => uploadFn(file) as Promise<Image>)).then(
            (images) => {
                runInAction(() => {
                    this.selected = [...this.selected, ...images];
                    this.images = [...this.images, ...images];
                });
            }
        );
    }

    public isExist(image: Image) {
        return Boolean(
            this.selected.find((selectedImage) => selectedImage.id === image.id)
        );
    }

    public unselect(image: Image) {
        this.selected = this.selected.filter((item) => item.id !== image.id);
    }

    public move(from: number, to: number) {
        const fromItem = this.selected[from];
        const toItem = this.selected[to];

        let tempSelected = this.selected;

        tempSelected[from] = toItem;
        tempSelected[to] = fromItem;

        this.selected = tempSelected;
    }

    public isSelected(image: Image) {
        return Boolean(this.selected.find(({ id }) => image.id === id));
    }
}
