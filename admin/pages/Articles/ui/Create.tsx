import React from "react";

import {
    ArticlesServiceProvider,
    ArticleCreateContent,
} from "features/Articles";

export const ArticleCreatePage: React.FC = () => {
    return (
        <ArticlesServiceProvider>
            <ArticleCreateContent />
        </ArticlesServiceProvider>
    );
};
