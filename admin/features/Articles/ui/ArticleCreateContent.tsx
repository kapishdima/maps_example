import React from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";

import { ArticleForm } from "./Form/ArticleForm";
import { useCreateArticle } from "../hooks/useCreateArticle";

export const ArticleCreateContent: React.FC = () => {
    const { createArticle, isLoading } = useCreateArticle();

    return (
        <Content
            header={<ContentHeader title="Create an Article" hasBackLink />}
        >
            <ArticleForm onSubmit={createArticle} isLoading={isLoading} />
        </Content>
    );
};
