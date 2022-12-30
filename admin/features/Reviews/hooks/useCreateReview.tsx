import { ReviewResponseEntity } from "entities/reviews";
import { useNavigate } from "react-router-dom";
import { useCreate } from "shared/hooks";
import { createSuccessNotification } from "shared/ui";
import { useReviewsService } from "./useReviewsService";

export const useCreateReview = () => {
    const wineriesService = useReviewsService();
    const navigate = useNavigate();

    const { mutate: createReview, isLoading } = useCreate<ReviewResponseEntity>(
        async (values) => {
            return await wineriesService?.createReview(values);
        },
        {
            onSuccess: (data: ReviewResponseEntity) => {
                createSuccessNotification({
                    title: "Review successfully created",
                });
                navigate(`/reviews/${data.id}`, { replace: true });
            },
        }
    );

    return { createReview, isLoading };
};
