import React from "react";

import { Table, EmptyState, SearchIcon } from "evergreen-ui";
import { TableInstance } from "react-table";

import { TableOption } from "./types";
import { Link } from "react-router-dom";

const getRowOptions = (options, index) => {
    if (!options) {
        return null;
    }

    return options[index].row;
};

const getCellOptions = (options, index) => {
    if (!options) {
        return null;
    }

    return options[index]?.cell;
};

type TableBodyProps = Pick<
    TableInstance<any>,
    "rows" | "prepareRow" | "getTableBodyProps"
> & {
    options?: TableOption[];
};

export const TableBody: React.FC<TableBodyProps> = ({
    rows,
    prepareRow,
    options,
    getTableBodyProps,
}) => {
    if (!rows || !rows.length) {
        return (
            <EmptyState
                icon={<SearchIcon color="#C1C4D6" />}
                iconBgColor="#EDEFF5"
                background="light"
                title="NO DATA!"
                orientation="horizontal"
                description="There is no information, you may not have added them yet"
                anchorCta={
                    <EmptyState.LinkButton to="create" is={Link}>
                        Create one
                    </EmptyState.LinkButton>
                }
            />
        );
    }

    return (
        <Table.Body maxHeight="70vh" {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
                prepareRow(row);

                const rowOptions = getRowOptions(options, rowIndex);

                return (
                    <Table.Row
                        {...row.getRowProps()}
                        {...rowOptions}
                        onSelect={
                            rowOptions?.onClick
                                ? rowOptions?.onClick(row)
                                : null
                        }
                    >
                        {row.cells.map((cell, cellIndex) => {
                            const cellOptions = getCellOptions(
                                options,
                                cellIndex
                            );

                            return (
                                <Table.TextCell
                                    {...cell.getCellProps()}
                                    {...cellOptions}
                                    width={cell.column.width}
                                    minWidth={cell.column.minWidth}
                                    maxWidth={cell.column.maxWidth}
                                >
                                    {cell.render("Cell")}
                                </Table.TextCell>
                            );
                        })}
                    </Table.Row>
                );
            })}
        </Table.Body>
    );
};
