import React from "react";

import {
    FormField,
    FormFieldProps,
    Heading,
    majorScale,
    Pane,
} from "evergreen-ui";

import { Input, InputCoreProps } from "shared/ui";

import { GalleryModal } from "./Modal/GalleryModal";
import { GalleryValues } from "./Values";
import { GalleryUpload } from "./Upload";

import { GalleryManager } from "../lib/providers/GalleryManager";
import { GalleryStoreProvider } from "../lib/providers/GalleryStoreProvider";
import { GalleryDefaultValueProvider } from "../lib/providers/GalleryDefaultValueProvider";

import { GetImageFunction, UploadFunction } from "../types";
import { Image } from "../model/image";

type GalleryInputProps = InputCoreProps &
    FormFieldProps & {
        buttonText?: string;
        getImages: GetImageFunction;
        upload: UploadFunction;
        saveToForm?: (images: Image[]) => void;
        modalTitle?: string;
        required?: boolean;
    };

export const GalleryInputMany: React.FC<GalleryInputProps> = ({
    name,
    label,
    hint,
    getImages,
    upload,
    saveToForm,
    modalTitle,
    required,
}) => {
    return (
        <GalleryStoreProvider>
            <FormField
                label={label || ""}
                hint={hint}
                marginBottom={majorScale(3)}
                isRequired={required}
            >
                <GalleryManager
                    name={name}
                    saveToForm={saveToForm}
                    getImages={getImages}
                >
                    <Input name={name}>
                        {({ field, fieldState }) => {
                            const isValid = !Boolean(fieldState.error);

                            return (
                                <GalleryDefaultValueProvider name={name}>
                                    <Pane display="flex" flexDirection="column">
                                        <GalleryUpload
                                            error={fieldState.error}
                                            isValid={isValid}
                                            upload={upload}
                                        />
                                        <Heading
                                            textAlign="center"
                                            marginBottom={majorScale(2)}
                                            size={100}
                                        >
                                            or select from uploaded
                                        </Heading>

                                        <GalleryModal title={modalTitle} />
                                        <GalleryValues />
                                    </Pane>
                                </GalleryDefaultValueProvider>
                            );
                        }}
                    </Input>
                </GalleryManager>
            </FormField>
        </GalleryStoreProvider>
    );
};
