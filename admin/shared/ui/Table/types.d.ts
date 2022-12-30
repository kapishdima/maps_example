export type TableOption = {
    row: TableRowProps;
    cell: TableCellProps;
};

export type UsePaginationProps = UsePaginationInstanceProps<any> &
    UsePaginationState<any>;

export type TableResizerProps = Pick<UsePaginationProps, "pageOptions">;

export type TablePaginationProps = Pick<
    UsePaginationProps,
    "page" | "pageCount" | "gotoPage" | "nextPage" | "previousPage"
>;
