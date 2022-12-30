import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { ReviewResponseEntity } from "entities/reviews";

import { ReviewForm } from "./Form/ReviewForm";
import { useReviewsService } from "../hooks/useReviewsService";
import { ReviewHeading } from "./Form/ReviewHeading";
import { useUpdateReview } from "../hooks/useUpdateReview";

export const ReviewEditContent: React.FC = () => {
    const reviewsService = useReviewsService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: review, isFetching } = useGetResourceById(
        "review",
        (id: string) => reviewsService.getReview(id)
    );
    const { mutate: updateReview, isLoading } = useUpdateReview(
        (id: string, review: ReviewResponseEntity) =>
            reviewsService.updateReview(id, review),
        onUpdateSuccess
    );

    if (isFetching) {
        return <Loading minWidth="100vw" minHeight="100vh" />;
    }

    return (
        <Content
            header={
                <ContentHeader
                    title={
                        <Pane display="flex" alignItems="center">
                            <ReviewHeading review={review} />
                            <InlineStatus
                                status={{
                                    value: review.status,
                                    label: review.status,
                                }}
                            />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <ReviewForm
                onSubmit={updateReview}
                defaultValue={review}
                isLoading={isLoading}
            />
        </Content>
    );
};
