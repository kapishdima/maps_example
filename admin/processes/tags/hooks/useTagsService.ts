import { useAxiosClient } from "app/hooks";
import { TagAPI } from "../api/tags.api";
import { TagsService } from "../service/tags.service";

export const useTagsService = () => {
    const axiosClient = useAxiosClient();
    const tagsApi = new TagAPI(axiosClient);
    const tagsService = new TagsService(tagsApi);

    return tagsService;
};
