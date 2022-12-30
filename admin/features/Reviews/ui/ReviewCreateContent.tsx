import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";

import { ReviewForm } from "./Form/ReviewForm";
import { useCreateReview } from "../hooks/useCreateReview";

export const ReviewCreateContent: React.FC = () => {
    const { createReview, isLoading } = useCreateReview();

    return (
        <Content header={<ContentHeader title="Create a review" hasBackLink />}>
            <ReviewForm onSubmit={createReview} isLoading={isLoading} />
        </Content>
    );
};
