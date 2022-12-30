import { Translation } from "../services/translations.service";

export function toTranslationsWithLocaleId<T extends Translation>(
    translations: T[]
) {
    return Object.keys(translations).map((key) => {
        return { ...translations[key], locale_id: key };
    });
}
