export type ListFilter = { [key: string]: string };

export type GetListOptions = {
    page?: number;
    size?: number;
    filters?: ListFilter[];
};
export type GetListFunction<D> = ({
    page,
    size,
}: GetListOptions) => D | Promise<D>;

export type Error = {
    data: {
        error: string;
    };
};
