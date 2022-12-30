import React from "react";

import { CountryDomainEntity } from "entities/countries";

import { ListResponse } from "shared/api";
import { AppTable, InlineStatus, TableActions } from "shared/ui";

type AdminsTableProps = {
    admins: ListResponse<any[]>;
    onDeleteAdmin: (id: number) => void;
    isFetching: boolean;
};

export const AdminsTable: React.FC<AdminsTableProps> = ({
    admins,
    isFetching,
    onDeleteAdmin,
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
                    (country as CountryDomainEntity)
                        ? country.code.toUpperCase()
                        : "",
            },
            {
                Header: "Date",
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
                            deletePermission={`resource.delete`}
                            editPermission={`resource.edit`}
                            onDelete={() => onDeleteAdmin(rowID)}
                            editLink={`/admins/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = admins?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={admins?.meta?.last_page}
            loading={isFetching}
            data={admins?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
