import { StaffLangsDomainEntity } from "../staff-langs-domain";
import { StaffLangsResponseEntity } from "../staff-langs-response";

export const toDomainEntity = (
    staffLang: StaffLangsResponseEntity
): StaffLangsDomainEntity => ({
    id: staffLang.id,
    language: staffLang.language,
});
