import React from "react";

import { ReviewsServiceProvider, ReviewEditContent } from "features/Reviews";

export const ReviewEditPage: React.FC = () => {
    return (
        <ReviewsServiceProvider>
            <ReviewEditContent />
        </ReviewsServiceProvider>
    );
};
