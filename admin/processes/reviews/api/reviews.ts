import { ReviewResponseEntity } from "entities/reviews";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface IReviewsAPI {
    getReviews: (
        options: GetListOptions
    ) => Promise<ListResponse<ReviewResponseEntity[]>>;
    getReview: (id: string) => Promise<ListResponse<ReviewResponseEntity>>;
    deleteReview: (id: number) => Promise<APIResponse<any>>;
    createReview: (
        review: ReviewResponseEntity
    ) => Promise<ReviewResponseEntity>;
    updateReview: (id: string, review: ReviewResponseEntity) => Promise<void>;
}

export class ReviewsAPI implements IReviewsAPI {
    constructor(private readonly client: IAPIClient) {}

    async getReviews(
        options: GetListOptions
    ): Promise<ListResponse<ReviewResponseEntity[]>> {
        const { data: reviews } = await this.client.get<
            ListResponse<ReviewResponseEntity[]>
        >(this.createFetchReviewsURL(options));

        return reviews;
    }

    async getReview(id: string): Promise<ListResponse<ReviewResponseEntity>> {
        const { data: review } = await this.client.get<
            ListResponse<ReviewResponseEntity>
        >(`/api/reviews/${id}`);

        return review;
    }

    async deleteReview(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/reviews/${id}`);
    }

    public async createReview(
        review: ReviewResponseEntity
    ): Promise<ReviewResponseEntity> {
        const { data: createdReview } = await this.client.post<
            ListResponse<ReviewResponseEntity>
        >("/api/reviews", review);

        return createdReview.data;
    }

    public async updateReview(
        id: string,
        review: ReviewResponseEntity
    ): Promise<void> {
        await this.client.patch(`/api/reviews/${id}`, review);
    }

    private createFetchReviewsURL(options: GetListOptions) {
        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/reviews?page=${page || 1}&per_page=${
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
