import { IAPIClient, ListResponse } from "shared/api";
import { GetListOptions } from "shared/api/types";
import { CreateMediaDTO } from "../models/create-media.dto";
import { MediaResponseEntity } from "../models/media-response.entity";

export interface IMediaAPI {
    getMedia: (
        options: GetListOptions
    ) => Promise<ListResponse<MediaResponseEntity[]>>;
    getMediaById: (id: string) => Promise<MediaResponseEntity>;
    createMedia: (
        payload: CreateMediaDTO
    ) => Promise<ListResponse<MediaResponseEntity>>;
}

export class MediaAPI implements IMediaAPI {
    constructor(private readonly client: IAPIClient) {}

    async getMedia(
        options?: GetListOptions
    ): Promise<ListResponse<MediaResponseEntity[]>> {
        const { data: media } = await this.client.get<
            ListResponse<MediaResponseEntity[]>
        >(
            options
                ? `/api/media?page=${options.page || 1}&per_page=${
                      options.size || 10
                  }`
                : `/api/media`
        );

        return media;
    }

    async getMediaById(id: string): Promise<MediaResponseEntity> {
        const { data: media } = await this.client.get<
            ListResponse<MediaResponseEntity>
        >(`/api/media/${id}`);

        return media.data;
    }

    async createMedia(
        payload: CreateMediaDTO
    ): Promise<ListResponse<MediaResponseEntity>> {
        const { data: media } = await this.client.post<
            ListResponse<MediaResponseEntity>
        >("/api/media", this.payloadToFormData(payload));
        return media;
    }

    private payloadToFormData<Payload extends {}>(payload: Payload): FormData {
        const formData = new FormData();
        const payloadKeys = Object.keys(payload);

        payloadKeys.forEach((key) => {
            formData.append(key, payload[key]);
        });

        return formData;
    }
}
