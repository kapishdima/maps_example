import { SeodataResponseEntity } from "entities/seodatas";
import { useCreate } from "shared/hooks";
import { useSeodatasService } from "./useSeodatasService";

export const useCreateSeodata = () => {
    const seodatasService = useSeodatasService();

    const { mutate: createSeodata, isLoading } =
        useCreate<SeodataResponseEntity>(async (values) => {
            await seodatasService?.createSeodata(values);
        });

    return { createSeodata, isLoading };
};
