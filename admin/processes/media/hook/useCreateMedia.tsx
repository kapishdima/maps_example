import { useMutation } from "react-query";
import { useMedia } from "./useMedia";

export const useCreateMedia = () => {
    const mediaService = useMedia();
    const { mutateAsync: createMedia, isLoading } = useMutation((file: File) =>
        mediaService.createMedia({ file })
    );

    return { createMedia, isLoading };
};
