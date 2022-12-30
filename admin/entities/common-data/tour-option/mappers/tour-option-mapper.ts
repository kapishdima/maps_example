import { TourOptionDomainEntity } from "../tour-option-domain";
import { TourOptionsResponseEntity } from "../tour-option-response";

export const toDomainEntity = (
    tourOption: TourOptionsResponseEntity
): TourOptionsResponseEntity => ({
    id: tourOption.id,
    name: tourOption.name,
});
