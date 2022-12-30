import { useMutation } from "react-query";
import { useReviewsService } from "./useReviewsService";

export const useDeleteReviews = (onSuccess: () => void) => {
    const reviewsService = useReviewsService();

    const deleteMutation = useMutation(
        (id: number) => reviewsService.deleteReview(id),
        { onSuccess }
    );

    return deleteMutation;
};
