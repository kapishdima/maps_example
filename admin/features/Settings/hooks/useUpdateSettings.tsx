import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import { SettingsResponseEntity } from "entities/settings";
import { createSuccessNotification } from "shared/ui";

type UpdateFunction = (
    id: string,
    settings: SettingsResponseEntity
) => Promise<void>;

export const useUpdateSettings = (update: UpdateFunction) => {
    const { id } = useParams<{ id: string }>();
    return useMutation(
        (settings: SettingsResponseEntity) => update(id, settings),
        {
            onSuccess: () => {
                createSuccessNotification({
                    title: "Settings successfully updated",
                });
            },
        }
    );
};
