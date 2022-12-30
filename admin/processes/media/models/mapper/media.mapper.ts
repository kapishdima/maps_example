import { CountryDomainEntity } from "entities/countries";
import { UserDomainEntity } from "entities/user";
import { MediaDomainEnity } from "../media-domain.entity";
import { MediaResponseEntity } from "../media-response.entity";

export const toDomainEntity =
    (country: CountryDomainEntity, owner: UserDomainEntity) =>
    (media: MediaResponseEntity): MediaDomainEnity => {
        return {
            id: media.id,
            country,
            owner,
            compressedPath: media.compressed_path,
            path: media.path,
        };
    };
