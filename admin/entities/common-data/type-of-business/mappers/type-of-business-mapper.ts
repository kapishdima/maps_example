import { TypeOfBusinessDomainEntity } from "../type-of-business-domain";
import { TypeOfBusinessResponseEntity } from "../type-of-business-response";

export const toDomainEntity = (
    tourOption: TypeOfBusinessResponseEntity
): TypeOfBusinessDomainEntity => ({
    id: tourOption.id,
    name: tourOption.name,
});
