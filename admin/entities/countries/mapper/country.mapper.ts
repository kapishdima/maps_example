import { CountryDomainEntity } from "../countries-domain";
import { CountryResponseEntity } from "../countries-response";

export const toDomainEntity = (
    country: CountryResponseEntity
): CountryDomainEntity => ({
    id: country.id,
    code: country.code,
    fullCode: country.full_code,
    slug: country.slug,
    localeId: country.locale_id,
    name: country.code,
});
