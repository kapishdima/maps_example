import React from "react";

import { Pane } from "evergreen-ui";

import { ReviewsViewContent, ReviewsServiceProvider } from "features/Reviews";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const ReviewsViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Reviews Page"
                    hint="On this page you can see all information about wineries in the form of a simple table"
                />
            }
        >
            <ReviewsServiceProvider>
                <ReviewsViewContent />
            </ReviewsServiceProvider>
        </Content>
    );
};
