import React from "react";

import { CountryDomainEntity } from "entities/countries";

import { ListResponse } from "shared/api";
import { AppTable, InlineStatus, TableActions } from "shared/ui";

type WineriesTableProps = {
    wineries: ListResponse<any[]>;
    onDeleteWinery: (id: number) => void;
    isFetching: boolean;
};

export const WineriesTable: React.FC<WineriesTableProps> = ({
    wineries,
    isFetching,
    onDeleteWinery,
}) => {
    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                width: 80,
                maxWidth: 80,
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Country",
                accessor: "country",
                Cell: ({ value: country }) =>
                    (country as CountryDomainEntity).code.toUpperCase(),
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => (
                    <InlineStatus status={{ value, label: value }} />
                ),
            },
            {
                Header: "Created",
                accessor: "createdAt",
            },
            {
                Header: "Actions",
                width: 100,
                maxWidth: 100,
                Cell: ({ row }) => {
                    const rowID = row?.original?.id;
                    const status = row?.original?.status;

                    return (
                        <TableActions
                            deletePermission={`resource.${status}.delete`}
                            editPermission={`resource.${status}.edit`}
                            onDelete={() => onDeleteWinery(rowID)}
                            editLink={`/wineries/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = wineries?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={wineries?.meta?.last_page}
            loading={isFetching}
            data={wineries?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
