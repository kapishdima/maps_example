import React from "react";
import { ArticlesAPI, ArticleService } from "processes/articles";
import { useAxiosClient } from "app/hooks";

export const ArticleServiceContext = React.createContext<ArticleService>(null);

export const ArticlesServiceProvider: React.FC = ({ children }) => {
    const axiosClient = useAxiosClient();
    const articlesService = new ArticleService(new ArticlesAPI(axiosClient));

    return (
        <ArticleServiceContext.Provider value={articlesService}>
            {children}
        </ArticleServiceContext.Provider>
    );
};
