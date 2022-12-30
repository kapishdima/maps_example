import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

type FetchFunction<D = any> = (id: string) => Promise<D>;

export function useGetResourceById<D = any>(
    key: string,
    fetch: FetchFunction<D>
) {
    const { id } = useParams<{ id: string }>();

    return useQuery([key, id], () => fetch(id));
}
