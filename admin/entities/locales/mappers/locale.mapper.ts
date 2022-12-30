import { LocaleResponseEntity } from "../locale-response.entiry";

export const toDomainEntity = (locale: LocaleResponseEntity) => ({
    id: locale.id,
    name: locale.locale,
});
