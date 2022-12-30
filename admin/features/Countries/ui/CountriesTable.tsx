import React from "react";

import { CountryDomainEntity } from "entities/countries";

import { ListResponse } from "shared/api";
import { AppTable, InlineStatus, TableActions } from "shared/ui";

type CountriesTableProps = {
    countries: ListResponse<any[]>;
    onDeleteCountry: (id: number) => void;
    isFetching: boolean;
};

export const CountriesTable: React.FC<CountriesTableProps> = ({
    countries,
    isFetching,
    onDeleteCountry,
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
                Header: "Code",
                accessor: "code",
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
                            onDelete={() => onDeleteCountry(rowID)}
                            editLink={`/countries/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = countries?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={countries?.meta?.last_page}
            loading={isFetching}
            data={countries?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
