import React from "react";

import { ListResponse } from "shared/api";
import { AppTable, TableActions } from "shared/ui";
import { useCommonDataContext } from "app/hooks";
import { CountryDomainEntity } from "entities/countries";

type RegionsTableProps = {
    regions: ListResponse<any[]>;
    onDeleteRegions: (id: number) => void;
    isFetching: boolean;
};

export const RegionsTable: React.FC<RegionsTableProps> = ({
    regions,
    isFetching,
    onDeleteRegions,
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
                accessor: `name`,
            },
            {
                Header: "Country",
                accessor: "country",
                Cell: ({ value: country }) =>
                    (country as CountryDomainEntity).code.toUpperCase(),
            },
            {
                Header: "Actions",
                width: 100,
                maxWidth: 100,
                Cell: ({ row }) => {
                    const rowID = row?.original?.id;

                    return (
                        <TableActions
                            deletePermission="regions.allActions"
                            editPermission="regions.allActions"
                            onDelete={() => onDeleteRegions(rowID)}
                            editLink={`/regions/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = regions?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={regions?.meta?.last_page}
            loading={isFetching}
            data={regions?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
