import React from "react";

import { CountryDomainEntity } from "entities/countries";

import { ListResponse } from "shared/api";
import { AppTable, InlineStatus, TableActions } from "shared/ui";
import { useCommonData, useCommonDataContext } from "app/hooks";

type SeodatasTableProps = {
    seodatas: ListResponse<any[]>;
    onDeleteSeodata: (id: number) => void;
    isFetching: boolean;
};

export const SeodatasTable: React.FC<SeodatasTableProps> = ({
    seodatas,
    isFetching,
    onDeleteSeodata,
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
                accessor: `title[${generalLocale.id}]`,
            },
            {
                Header: "Slug",
                accessor: "slug",
            },
            {
                Header: "Actions",
                width: 100,
                maxWidth: 100,
                Cell: ({ row }) => {
                    const rowID = row?.original?.id;

                    return (
                        <TableActions
                            deletePermission="seodata.allActions"
                            editPermission="seodata.allActions"
                            onDelete={() => onDeleteSeodata(rowID)}
                            editLink={`/seodatas/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = seodatas?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={seodatas?.meta?.last_page}
            loading={isFetching}
            data={seodatas?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
