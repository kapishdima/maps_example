import React from "react";

import { Heading, majorScale } from "evergreen-ui";

import { ReviewResponseEntity } from "entities/reviews";

export type ReviewHeadingProps = {
    review: ReviewResponseEntity;
};

export const ReviewHeading: React.FC<ReviewHeadingProps> = ({ review }) => {
    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {review.comment.slice(0, 10)}...
        </Heading>
    );
};
