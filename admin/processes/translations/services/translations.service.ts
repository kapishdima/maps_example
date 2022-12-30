import { LocaleDomainEntity } from "entities/locales";

export type Translation = {
    locale_id: number;
};

export interface ITranslationsService {
    getTranslationFromGroup: <T extends Translation>(
        translations: T[],
        locale: LocaleDomainEntity
    ) => T;
}

export class TranslationsService {
    constructor() {}
    public static getTranslationFromGroup<T extends Translation>(
        translations: T[],
        locale: LocaleDomainEntity
    ): T {
        return Object.values(translations).find(
            (translation) => translation.locale_id === locale?.id
        );
    }
}
