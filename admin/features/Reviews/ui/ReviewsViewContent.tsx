import React from "react";
import { useDeleteReviews } from "../hooks/useDeleteReviews";
import { useFetchReviews } from "../hooks/useFetchReviews";

import { ReviewsFilters } from "./ReviewsFilters";
import { ReviewsTable } from "./ReviewsTable";

export const ReviewsViewContent: React.FC = () => {
    const { reviews, isFetching, applyFilters, refetch } = useFetchReviews();
    const deleteMutation = useDeleteReviews(refetch);

    return (
        <>
            <ReviewsFilters applyFilters={applyFilters} />
            <ReviewsTable
                reviews={reviews}
                isFetching={isFetching}
                onDeleteReview={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
