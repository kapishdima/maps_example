import { ReviewDomainEntity, ReviewResponseEntity } from "entities/reviews";

import { ILocalesStore, LocalesStore } from "processes/locales";
import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";

import { IReviewsAPI } from "../api/reviews";

export class ReviewService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly reviewsAPI: IReviewsAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async fetchReviews(
        options: GetListOptions
    ): Promise<ListResponse<ReviewDomainEntity[]>> {
        const reviewsFromApi = await this.reviewsAPI.getReviews(options);

        if (!reviewsFromApi) {
            return null;
        }

        const reviewsWithDetails = reviewsFromApi.data.map((review) =>
            this.mapToReviewsDetails(review)
        );

        return {
            data: reviewsWithDetails,
            meta: reviewsFromApi.meta,
        };
    }

    public async deleteReview(id: number): Promise<void> {
        await this.reviewsAPI.deleteReview(id);
    }

    public async createReview(
        review: ReviewResponseEntity
    ): Promise<ReviewResponseEntity> {
        return await this.reviewsAPI.createReview(review);
    }

    public async getReview(id: string): Promise<ReviewResponseEntity> {
        const { data: reviewFromApi } = await this.reviewsAPI.getReview(id);

        return reviewFromApi;
    }

    public async updateReview(id: string, review: ReviewResponseEntity) {
        return await this.reviewsAPI.updateReview(id, review);
    }

    private mapToReviewsDetails(
        review: ReviewResponseEntity
    ): ReviewDomainEntity {
        return {
            id: review.id,
            name: review.comment?.slice(0, 20) + "...",
            status: review.status,
            createdAt: new Date(review.created_at).toLocaleString(),
            winery: review.winery,
        };
    }
}
