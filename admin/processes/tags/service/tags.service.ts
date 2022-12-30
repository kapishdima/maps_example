import { TagRequestEntity } from "entities/tag";
import { TagMapper } from "entities/tag/mapper/tag.mapper";
import { TagDomainEntity } from "entities/tag/tag-domain.entity";
import { ITagAPI, TagsFilters } from "../api/tags.api";

export class TagsService {
    constructor(private readonly tagApi: ITagAPI) {}

    async getTags() {
        const { data: tags } = await this.tagApi.getTags();

        return tags.map(TagMapper.toDomainEntity);
    }

    async searchTags(filters: TagsFilters) {
        const { data: tags } = await this.tagApi.searchTags(filters);

        return tags.map(TagMapper.toDomainEntity);
    }

    async createTag(payload: TagRequestEntity): Promise<TagDomainEntity> {
        const { data: tag } = await this.tagApi.createTags(payload);

        return TagMapper.toDomainEntity(tag);
    }
}
