import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { ArticleResponseEntity } from "entities/articles";
import { createSuccessNotification } from "shared/ui";

type UpdateFunction = (
    id: string,
    article: ArticleResponseEntity
) => Promise<void>;

export const useUpdateArticle = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (article: ArticleResponseEntity) => update(id, article),
        {
            onSuccess: () => {
                onSuccess(),
                    createSuccessNotification({
                        title: "Article successfully updated",
                    });
            },
        }
    );
};
