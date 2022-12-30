import React from "react";
import { Heading, majorScale } from "evergreen-ui";
import { ArticleResponseEntity } from "entities/articles";

export type ArticleHeadingProps = {
    article: ArticleResponseEntity;
};

export const ArticleHeading: React.FC<ArticleHeadingProps> = ({ article }) => {
    return (
        <Heading size={700} marginRight={majorScale(3)}>
            {article.title}
        </Heading>
    );
};
