import React from "react";

import {
    ErrorIcon,
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
        saveToForm?: (images: Image) => void;
        modalTitle?: string;
        required?: boolean;
    };

export const GalleryInputSingle: React.FC<GalleryInputProps> = ({
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
            <GalleryManager
                name={name}
                saveToForm={saveToForm}
                getImages={getImages}
            >
                <Input name={name}>
                    {({ field, fieldState }) => {
                        const isValid = !Boolean(fieldState.error);

                        return (
                            <FormField
                                label={label || ""}
                                isRequired={required}
                                hint={
                                    fieldState.error ? (
                                        <Heading
                                            size={200}
                                            color="#D14343"
                                            display="flex"
                                            alignItems="center"
                                            fontWeight={400}
                                            marginTop={majorScale(2)}
                                            columnGap={majorScale(1)}
                                        >
                                            <ErrorIcon color="danger" />
                                            {fieldState.error.message}
                                        </Heading>
                                    ) : null
                                }
                                marginBottom={majorScale(3)}
                            >
                                <GalleryDefaultValueProvider name={name}>
                                    <Pane
                                        display="flex"
                                        alignItems="center"
                                        columnGap={majorScale(2)}
                                    >
                                        <GalleryUpload
                                            isValid={isValid}
                                            upload={upload}
                                        />
                                        <Heading size={100}>or</Heading>
                                        <GalleryModal title={modalTitle} />
                                    </Pane>
                                    <GalleryValues />
                                </GalleryDefaultValueProvider>
                            </FormField>
                        );
                    }}
                </Input>
            </GalleryManager>
        </GalleryStoreProvider>
    );
};
