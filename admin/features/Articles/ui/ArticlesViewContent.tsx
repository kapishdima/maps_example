import React from "react";
import { useDeleteArticles } from "../hooks/useDeleteArticles";
import { useFetchArticles } from "../hooks/useFetchArticles";

import { ArticlesFilters } from "./ArticlesFilters";
import { ArticlesTable } from "./ArticlesTable";

export const ArticlesViewContent: React.FC = () => {
    const { articles, isFetching, applyFilters, refetch } = useFetchArticles();
    const deleteMutation = useDeleteArticles(refetch);

    return (
        <>
            <ArticlesFilters applyFilters={applyFilters} />
            <ArticlesTable
                articles={articles}
                isFetching={isFetching}
                onDeleteArticle={(id: number) => deleteMutation.mutate(id)}
            />
        </>
    );
};
