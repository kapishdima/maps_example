import { useAxiosClient } from "app/hooks";
import { MediaAPI } from "../api/media.api";
import { MediaService } from "../service/media.service";

export const useMedia = () => {
    const axiosClient = useAxiosClient();
    const mediaApi = new MediaAPI(axiosClient);
    const mediaService = new MediaService(mediaApi);

    return mediaService;
};
