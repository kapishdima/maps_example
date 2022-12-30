import React from "react";

import { ReviewsServiceProvider, ReviewCreateContent } from "features/Reviews";

export const ReviewCreatePage: React.FC = () => {
    return (
        <ReviewsServiceProvider>
            <ReviewCreateContent />
        </ReviewsServiceProvider>
    );
};
