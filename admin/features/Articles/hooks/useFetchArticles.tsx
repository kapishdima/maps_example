import { ArticleDomainEntity } from "entities/articles";
import { useList } from "shared/hooks";
import { useArticlesService } from "./useArticlesService";

export const useFetchArticles = () => {
    const articlesService = useArticlesService();

    const {
        applyFilters,
        pagination,
        data: articles,
        isFetching,
        refetch,
    } = useList<ArticleDomainEntity[]>("articles", ({ page, size, filters }) =>
        articlesService.fetchArticles({
            page,
            size,
            filters,
        })
    );

    return {
        applyFilters,
        pagination,
        articles,
        isFetching,
        refetch,
    };
};
