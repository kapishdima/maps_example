import React from "react";

import { CountryDomainEntity } from "entities/countries";

import { ListResponse } from "shared/api";
import { AppTable, InlineStatus, TableActions } from "shared/ui";

type ArticlesTableProps = {
    articles: ListResponse<any[]>;
    onDeleteArticle: (id: number) => void;
    isFetching: boolean;
};

export const ArticlesTable: React.FC<ArticlesTableProps> = ({
    articles,
    isFetching,
    onDeleteArticle,
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
                Header: "Title",
                accessor: "title",
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
                            onDelete={() => onDeleteArticle(rowID)}
                            editLink={`/articles/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = articles?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={articles?.meta?.last_page}
            loading={isFetching}
            data={articles?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
