import { EventResponseEntity } from "entities/events";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface IEventsAPI {
    getEvents: (
        options: GetListOptions
    ) => Promise<ListResponse<EventResponseEntity[]>>;
    getEvent: (id: string) => Promise<ListResponse<EventResponseEntity>>;
    deleteEvent: (id: number) => Promise<APIResponse<any>>;
    createEvent: (event: EventResponseEntity) => Promise<EventResponseEntity>;
    updateEvent: (id: string, event: any) => Promise<void>;
}

export class EventsAPI implements IEventsAPI {
    constructor(private readonly client: IAPIClient) {}

    async getEvents(
        options: GetListOptions
    ): Promise<ListResponse<EventResponseEntity[]>> {
        const { data: events } = await this.client.get<
            ListResponse<EventResponseEntity[]>
        >(this.createFetchEventsURL(options));

        return events;
    }

    async getEvent(id: string): Promise<ListResponse<EventResponseEntity>> {
        const { data: event } = await this.client.get<
            ListResponse<EventResponseEntity>
        >(`/api/events/${id}`);

        return event;
    }

    async deleteEvent(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/events/${id}`);
    }

    public async createEvent(
        event: EventResponseEntity
    ): Promise<EventResponseEntity> {
        const { data: createdEvent } = await this.client.post<
            ListResponse<EventResponseEntity>
        >("/api/events", event);

        return createdEvent.data;
    }

    public async updateEvent(id: string, event: any): Promise<void> {
        await this.client.patch(`/api/events/${id}`, event);
    }

    private createFetchEventsURL(options: GetListOptions) {
        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/events?page=${page || 1}&per_page=${
            size || 10
        }&${filterQueryParams}`;
    }

    private createFiltersURL(filters: ListFilter[]) {
        if (!filters || !filters.length) {
            return "";
        }

        let url = "";
        // FIXME: Это че такое?
        for (const filter of filters) {
            for (const [key, value] of Object.entries(filter)) {
                url = url + [key, value].join("=") + "&";
            }
        }

        return url;
    }
}
