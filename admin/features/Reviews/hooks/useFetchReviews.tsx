import { ReviewDomainEntity } from "entities/reviews";
import { useList } from "shared/hooks";
import { useReviewsService } from "./useReviewsService";

export const useFetchReviews = () => {
    const reviewsService = useReviewsService();

    const {
        applyFilters,
        pagination,
        data: reviews,
        isFetching,
        refetch,
    } = useList<ReviewDomainEntity[]>("reviews", ({ page, size, filters }) =>
        reviewsService.fetchReviews({
            page,
            size,
            filters,
        })
    );

    return {
        applyFilters,
        pagination,
        reviews,
        isFetching,
        refetch,
    };
};
