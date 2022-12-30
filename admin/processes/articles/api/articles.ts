import { ArticleResponseEntity } from "entities/articles";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface IArticlesAPI {
    getArticles: (
        options: GetListOptions
    ) => Promise<ListResponse<ArticleResponseEntity[]>>;
    getArticle: (id: string) => Promise<ListResponse<ArticleResponseEntity>>;
    deleteArticle: (id: number) => Promise<APIResponse<any>>;
    createArticle: (
        article: ArticleResponseEntity
    ) => Promise<ArticleResponseEntity>;
    updateArticle: (
        id: string,
        article: ArticleResponseEntity
    ) => Promise<void>;
}

export class ArticlesAPI implements IArticlesAPI {
    constructor(private readonly client: IAPIClient) {}

    async getArticles(
        options: GetListOptions
    ): Promise<ListResponse<ArticleResponseEntity[]>> {
        const { data: articles } = await this.client.get<
            ListResponse<ArticleResponseEntity[]>
        >(this.createFetchArticlesURL(options));

        return articles;
    }

    async getArticle(id: string): Promise<ListResponse<ArticleResponseEntity>> {
        const { data: article } = await this.client.get<
            ListResponse<ArticleResponseEntity>
        >(`/api/articles/${id}`);

        return article;
    }

    async deleteArticle(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/articles/${id}`);
    }

    public async createArticle(
        article: ArticleResponseEntity
    ): Promise<ArticleResponseEntity> {
        const { data: createdArticle } = await this.client.post<
            ListResponse<ArticleResponseEntity>
        >("/api/articles", article);

        return createdArticle.data;
    }

    public async updateArticle(
        id: string,
        article: ArticleResponseEntity
    ): Promise<void> {
        await this.client.patch(`/api/articles/${id}`, article);
    }

    private createFetchArticlesURL(options: GetListOptions) {
        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/articles?page=${page || 1}&per_page=${
            size || 10
        }&${filterQueryParams}`;
    }

    private createFiltersURL(filters: ListFilter[]) {
        if (!filters || !filters.length) {
            return "";
        }

        let url = "";
        // FIXME: Это че такое?
        for (const filter of filters) {
            for (const [key, value] of Object.entries(filter)) {
                url = url + [key, value].join("=") + "&";
            }
        }

        return url;
    }
}
