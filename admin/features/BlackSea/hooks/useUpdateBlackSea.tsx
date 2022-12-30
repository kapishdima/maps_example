import { useMutation } from "react-query";

import { BlackSeaResponseEntity } from "entities/black-sea";
import { createSuccessNotification } from "shared/ui";

type UpdateFunction = (blackSea: BlackSeaResponseEntity) => Promise<void>;

export const useUpdateBlackSea = (update: UpdateFunction) => {
    return useMutation((blackSea: BlackSeaResponseEntity) => update(blackSea), {
        onSuccess: () => {
            createSuccessNotification({
                title: "BlackSea successfully updated",
            });
        },
    });
};
