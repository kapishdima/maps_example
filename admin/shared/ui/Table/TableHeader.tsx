import React from "react";

import { TableInstance } from "react-table";
import { Table } from "evergreen-ui";

type TableHeaderProps = Pick<TableInstance<any>, "headerGroups">;

export const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => {
    return (
        <Table.Head>
            {headerGroups.map((headerGroup) =>
                headerGroup.headers.map((column) => {
                    return (
                        <Table.HeaderCell
                            {...column.getHeaderProps()}
                            width={column.width}
                            minWidth={column.minWidth}
                            maxWidth={column.maxWidth}
                        >
                            {column.render("Header")}
                        </Table.HeaderCell>
                    );
                })
            )}
        </Table.Head>
    );
};
