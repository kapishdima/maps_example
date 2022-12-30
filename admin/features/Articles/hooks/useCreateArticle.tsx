import { ArticleResponseEntity } from "entities/articles";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";
import { useArticlesService } from "./useArticlesService";

export const useCreateArticle = () => {
    const articlesService = useArticlesService();
    const navigate = useNavigate();

    const { mutate: createArticle, isLoading } =
        useCreate<ArticleResponseEntity>(
            async (values) => {
                return await articlesService?.createArticle(values);
            },
            {
                onSuccess: (data: ArticleResponseEntity) => {
                    createSuccessNotification({
                        title: "Article successfully created",
                    });
                    navigate(`/articles/${data.id}`, { replace: true });
                },
            }
        );

    return { createArticle, isLoading };
};
