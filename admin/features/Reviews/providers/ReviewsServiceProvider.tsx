import React from "react";
import { ReviewsAPI, ReviewService } from "processes/reviews";
import { useAxiosClient } from "app/hooks";

export const ReviewServiceContext = React.createContext<ReviewService>(null);

export const ReviewsServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const reviewsService = new ReviewService(new ReviewsAPI(axiosClient));

    return (
        <ReviewServiceContext.Provider value={reviewsService}>
            {children}
        </ReviewServiceContext.Provider>
    );
};
