import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { ArticleResponseEntity } from "entities/articles";

import { ArticleForm } from "./Form/ArticleForm";
import { useArticlesService } from "../hooks/useArticlesService";
import { ArticleHeading } from "./Form/ArticleHeading";
import { useUpdateArticle } from "../hooks/useUpdateArticle";

export const ArticleEditContent: React.FC = () => {
    const articlesService = useArticlesService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: article, isFetching } = useGetResourceById(
        "article",
        (id: string) => articlesService.getArticle(id)
    );
    const { mutate: updateArticle, isLoading } = useUpdateArticle(
        (id: string, article: ArticleResponseEntity) =>
            articlesService.updateArticle(id, article),
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
                            <ArticleHeading article={article} />
                            <InlineStatus
                                status={{
                                    value: article.status,
                                    label: article.status,
                                }}
                            />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <ArticleForm
                onSubmit={updateArticle}
                defaultValue={article}
                isLoading={isLoading}
            />
        </Content>
    );
};
