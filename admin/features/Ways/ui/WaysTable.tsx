import React from "react";

import { WayDomainEntity } from "entities/ways";
import { CountryDomainEntity } from "entities/countries";

import { AppTable, InlineStatus, TableActions } from "shared/ui";
import { ListResponse } from "shared/api";

type WaysTableProps = {
    ways: ListResponse<WayDomainEntity[]>;
    isFetching: boolean;
    onDelete?: (id: number) => void;
};

export const WaysTable: React.FC<WaysTableProps> = ({
    ways,
    isFetching,
    onDelete,
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
                Header: "Contry",
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
                            onDelete={() => onDelete(rowID)}
                            editLink={`/ways/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = ways?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={ways?.meta?.last_page}
            loading={isFetching}
            data={ways?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
