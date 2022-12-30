import { TagDomainEntity } from "../tag-domain.entity";
import { TagResponseEntity } from "../tag-response.entity";

export class TagMapper {
    public static toDomainEntity(tag: TagResponseEntity) {
        return new TagDomainEntity(tag.id, tag.name, tag.country_id);
    }
}
