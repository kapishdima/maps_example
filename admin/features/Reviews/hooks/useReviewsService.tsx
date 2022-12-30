import React from "react";
import { ReviewServiceContext } from "../providers/ReviewsServiceProvider";

export const useReviewsService = () => {
    return React.useContext(ReviewServiceContext);
};
