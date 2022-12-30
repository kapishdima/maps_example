import React from "react";

import { ArticlesServiceProvider, ArticleEditContent } from "features/Articles";

export const ArticleEditPage: React.FC = () => {
    return (
        <ArticlesServiceProvider>
            <ArticleEditContent />
        </ArticlesServiceProvider>
    );
};
