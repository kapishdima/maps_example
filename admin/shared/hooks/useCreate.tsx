import { useMutation } from "react-query";

type UseCreateOptions<D, R> = {
    onSuccess?: any;
};

type CreateFunction<D, R = any> = (values: D) => Promise<R>;

export function useCreate<D, R = any>(
    create: CreateFunction<D, R>,
    options?: UseCreateOptions<D, R>
) {
    const { mutate, isLoading } = useMutation(create, {
        onSuccess: options?.onSuccess,
    });

    return { mutate, isLoading };
}
