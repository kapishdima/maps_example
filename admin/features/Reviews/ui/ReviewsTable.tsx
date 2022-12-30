import React from "react";

import { CountryDomainEntity } from "entities/countries";

import { ListResponse } from "shared/api";
import { AppTable, InlineStatus, TableActions } from "shared/ui";
import { Link } from "react-router-dom";
import { useCommonDataContext } from "app/hooks";

type ReviewsTableProps = {
    reviews: ListResponse<any[]>;
    onDeleteReview: (id: number) => void;
    isFetching: boolean;
};

export const ReviewsTable: React.FC<ReviewsTableProps> = ({
    reviews,
    isFetching,
    onDeleteReview,
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
                accessor: "winery",
                Cell: ({ row }) => {
                    if (!row.original.winery) {
                        return "";
                    }
                    return (
                        <Link to={`/wineries/${row.original.winery.id}`}>
                            {
                                row.original.winery.translations[
                                    generalLocale.id
                                ]?.name
                            }
                        </Link>
                    );
                },
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
                            onDelete={() => onDeleteReview(rowID)}
                            editLink={`/reviews/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = reviews?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={reviews?.meta?.last_page}
            loading={isFetching}
            data={reviews?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
