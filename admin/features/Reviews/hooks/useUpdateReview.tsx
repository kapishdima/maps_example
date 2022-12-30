import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { ReviewResponseEntity } from "entities/reviews";
import { createSuccessNotification } from "shared/ui";

type UpdateFunction = (
    id: string,
    review: ReviewResponseEntity
) => Promise<void>;

export const useUpdateReview = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation((review: ReviewResponseEntity) => update(id, review), {
        onSuccess: () => {
            onSuccess(),
                createSuccessNotification({
                    title: "Review successfully updated",
                });
        },
    });
};
