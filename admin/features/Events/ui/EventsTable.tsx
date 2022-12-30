import React from "react";

import { CountryDomainEntity } from "entities/countries";

import { ListResponse } from "shared/api";
import { AppTable, InlineStatus, TableActions } from "shared/ui";

type EventsTableProps = {
    events: ListResponse<any[]>;
    onDeleteEvent: (id: number) => void;
    isFetching: boolean;
};

export const EventsTable: React.FC<EventsTableProps> = ({
    events,
    isFetching,
    onDeleteEvent,
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
                            onDelete={() => onDeleteEvent(rowID)}
                            editLink={`/events/${rowID}`}
                        />
                    );
                },
            },
        ],
        []
    );

    const tableOptions = events?.data?.map(() => ({
        cell: {},
        row: {
            isSelectable: true,
        },
    }));

    return (
        <AppTable
            total={events?.meta?.last_page}
            loading={isFetching}
            data={events?.data}
            columns={columns}
            options={tableOptions}
        />
    );
};
