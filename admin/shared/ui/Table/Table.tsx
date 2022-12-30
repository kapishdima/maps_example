import React, { useEffect } from "react";

import { majorScale, Table, Pane, Spinner } from "evergreen-ui";
import { useTable, TableOptions } from "react-table";

import { TableOption } from "./types";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";

interface AppTableProps extends TableOptions<any> {
    options?: TableOption[];
    loading?: boolean;
    total: number;
}

export const AppTable = ({
    columns,
    data,
    options,
    loading,
    total,
}: AppTableProps) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data: data || [],
            manualPagination: true,
            pageCount: total,
        });

    return (
        <>
            <Table {...getTableProps()}>
                <TableHeader headerGroups={headerGroups} />

                {loading ? (
                    <Pane
                        height="70vh"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Spinner size={24} />
                    </Pane>
                ) : (
                    <TableBody
                        rows={rows}
                        prepareRow={prepareRow}
                        options={options}
                        getTableBodyProps={getTableBodyProps}
                    />
                )}
            </Table>
            <Pane marginTop={majorScale(2)}>
                <TableFooter totalPages={total} />
            </Pane>
        </>
    );
};
