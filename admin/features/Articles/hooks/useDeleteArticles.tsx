import { useMutation } from "react-query";
import { useArticlesService } from "./useArticlesService";

export const useDeleteArticles = (onSuccess: () => void) => {
    const articlesService = useArticlesService();

    const deleteMutation = useMutation(
        (id: number) => articlesService.deleteArticle(id),
        {
            onSuccess,
        }
    );

    return deleteMutation;
};
