import { ViewMapperService } from "processes/view-mapper";
import { GetListOptions } from "shared/api";

import { IMediaAPI } from "../api/media.api";
import { CreateMediaDTO } from "../models/create-media.dto";
import { toDomainEntity } from "../models/mapper/media.mapper";
import { MediaDomainEnity } from "../models/media-domain.entity";
import { MediaResponseEntity } from "../models/media-response.entity";

export class MediaService {
    private viewMapper: ViewMapperService;
    constructor(private readonly mediaApi: IMediaAPI) {
        this.viewMapper = new ViewMapperService();
    }

    async getMedia(options?: GetListOptions) {
        const { data: media, meta } = await this.mediaApi.getMedia(options);
        return {
            data: this.mapToMediaDomainEntity(media),
            meta: {
                ...meta,
                total: Math.ceil(meta.total / meta.per_page),
            },
        };
    }

    async getMediaById(id: string) {
        const media = await this.mediaApi.getMediaById(id);
        const country = this.viewMapper.getCountryDetails(media);

        return toDomainEntity(country, null)(media);
    }

    async createMedia(payload: CreateMediaDTO) {
        const { data: media } = await this.mediaApi.createMedia(payload);

        return this.mapToMediaDomainEntity(media) as MediaDomainEnity;
    }

    private mapToMediaDomainEntity(
        media: MediaResponseEntity | MediaResponseEntity[]
    ) {
        const mapToDomain = (media: MediaResponseEntity) => {
            const country = this.viewMapper.getCountryDetails(media);

            return toDomainEntity(country, null)(media);
        };

        if (Array.isArray(media)) {
            return media.map(mapToDomain);
        }

        return mapToDomain(media);
    }
}
