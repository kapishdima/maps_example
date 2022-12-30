import React, { useEffect, useState } from "react";

import {
    ErrorIcon,
    FileUploader,
    Heading,
    InfoSignIcon,
    majorScale,
    Pane,
} from "evergreen-ui";
import { useMutation } from "react-query";
import { observer } from "mobx-react";

import { Loading } from "shared/ui";

import { useGalleryStore } from "../hooks/useGalleryStore";
import { UploadFunction } from "../types";
import { ControllerFieldState, FieldError } from "react-hook-form";

type GalleryUploadProps = {
    upload: UploadFunction;
    label?: string;
    description?: string;
    isValid?: boolean;
    error?: FieldError;
};

export const GalleryUpload: React.FC<GalleryUploadProps> = ({
    upload,
    label,
    description,
    isValid,
    error,
}) => {
    const galleryStore = useGalleryStore();

    const { mutateAsync: startUploading, isLoading } = useMutation(
        (file: File) => upload(file)
    );

    const [files, setFiles] = useState<File[]>([]);

    const onAccepted = (files: File[]) => {
        setFiles((_files) => [..._files, ...files]);
    };

    useEffect(() => {
        if (!files.length) {
            return;
        }
        galleryStore.upload(startUploading, files);
    }, [files.length]);

    return (
        <Pane>
            {isLoading ? (
                <Loading title="File is loading" />
            ) : (
                <FileUploader
                    style={
                        !isValid
                            ? {
                                  borderColor: "#D14343",
                                  borderStyle: "solid",
                                  backgroundColor: "#FDF4F4",
                              }
                            : null
                    }
                    label={label || "Upload File"}
                    description={description || `File can be up to 50 MB.`}
                    hint={
                        error ? (
                            <Heading
                                size={200}
                                color="#D14343"
                                display="flex"
                                alignItems="center"
                                fontWeight={400}
                                marginTop={majorScale(2)}
                                columnGap={majorScale(1)}
                            >
                                <ErrorIcon color="danger" /> {error?.message}{" "}
                            </Heading>
                        ) : null
                    }
                    maxSizeInBytes={50 * 1024 ** 2}
                    onAccepted={onAccepted}
                />
            )}
        </Pane>
    );
};
