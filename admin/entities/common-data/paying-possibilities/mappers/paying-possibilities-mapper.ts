import { PayingPossibilityDomainEntity } from "../paying-possibilities-domain";
import { PayingPossibilityResponseEntity } from "../paying-possibilities-response";

export const toDomainEntity = (
    payingPossility: PayingPossibilityResponseEntity
): PayingPossibilityDomainEntity => ({
    id: payingPossility.id,
    name: payingPossility.name,
});
