import { ArticleDomainEntity, ArticleResponseEntity } from "entities/articles";

import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";

import { IArticlesAPI } from "../api/articles";

export class ArticleService {
    constructor(private readonly articlesAPI: IArticlesAPI) {}

    public async fetchArticles(
        options: GetListOptions
    ): Promise<ListResponse<ArticleDomainEntity[]>> {
        const articlesFromApi = await this.articlesAPI.getArticles(options);

        if (!articlesFromApi) {
            return null;
        }

        const articlesWithDetails = articlesFromApi.data.map((article) =>
            this.mapToArticlesDetails(article)
        );

        return {
            data: articlesWithDetails,
            meta: articlesFromApi.meta,
        };
    }

    public async deleteArticle(id: number): Promise<void> {
        await this.articlesAPI.deleteArticle(id);
    }

    public async createArticle(
        article: ArticleResponseEntity
    ): Promise<ArticleResponseEntity> {
        return await this.articlesAPI.createArticle(article);
    }

    public async getArticle(id: string): Promise<ArticleResponseEntity> {
        const { data: articleFromApi } = await this.articlesAPI.getArticle(id);

        return articleFromApi;
    }

    public async updateArticle(id: string, article: ArticleResponseEntity) {
        return await this.articlesAPI.updateArticle(id, article);
    }

    private mapToArticlesDetails(
        article: ArticleResponseEntity
    ): ArticleDomainEntity {
        return {
            id: article.id,
            title: article.title,
            status: article.status,
            createdAt: new Date(article.created_at).toLocaleString(),
        };
    }
}
