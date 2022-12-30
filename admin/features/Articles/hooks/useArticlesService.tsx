import React from "react";
import { ArticleServiceContext } from "../providers/ArticlesServiceProvider";

export const useArticlesService = () => {
    return React.useContext(ArticleServiceContext);
};
