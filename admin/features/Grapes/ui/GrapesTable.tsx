import React from "react";

import { CountryDomainEntity } from "entities/countries";

import { ListResponse } from "shared/api";
import { AppTable, InlineStatus, TableActions } from "shared/ui";
import { useCommonDataContext } from "app/hooks";

type GrapesTableProps = {
    grapes: ListResponse<any[]>;
    onDeleteGrape: (id: number) => void;
    isFetching: boolean;
};

export const GrapesTable: React.FC<GrapesTableProps> = ({
    grapes,
    isFetching,
    onDeleteGrape,
}) => {
    const { generalLocale } = useCommonDataContext();

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
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => (
                    <InlineStatus status={{ value, label: value }} />
                ),
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
                            deletePermission={`resource.${status}.delete`}
                            editPermission={`resource.${status}.edit`}
                            onDelete={() => onDeleteGrape(rowID)}
                            editLink={`/grapeVarieties/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = grapes?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={grapes?.meta?.last_page}
            loading={isFetching}
            data={grapes?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
