import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { CountryResponseEntity } from "entities/countries";
import { createSuccessNotification } from "shared/ui";
import { toTranslationsWithLocaleId } from "processes/translations/lib/withLocaleId";

type UpdateFunction = (
    id: string,
    country: CountryResponseEntity
) => Promise<void>;

export const useUpdateCountry = (
    update: UpdateFunction,
    onSuccess: () => void
) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (country: CountryResponseEntity) =>
            update(id, {
                ...country,
                translations: toTranslationsWithLocaleId(country.translations),
            }),
        {
            onSuccess: () => {
                onSuccess(),
                    createSuccessNotification({
                        title: "Country successfully updated",
                    });
            },
        }
    );
};
