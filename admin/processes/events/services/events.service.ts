import { EventDomainEntity, EventResponseEntity } from "entities/events";

import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";
import { EventTranslation } from "entities/events";

import { IEventsAPI } from "../api/events";

export class EventService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly eventsAPI: IEventsAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async fetchEvents(
        options: GetListOptions
    ): Promise<ListResponse<EventDomainEntity[]>> {
        const eventsFromApi = await this.eventsAPI.getEvents(options);

        if (!eventsFromApi) {
            return null;
        }

        const eventsWithDetails = eventsFromApi.data.map((event) =>
            this.mapToEventsDetails(event)
        );

        return {
            data: eventsWithDetails,
            meta: eventsFromApi.meta,
        };
    }

    public async deleteEvent(id: number): Promise<void> {
        await this.eventsAPI.deleteEvent(id);
    }

    public async createEvent(
        event: EventResponseEntity
    ): Promise<EventResponseEntity> {
        return await this.eventsAPI.createEvent({
            ...event,
            translations: Object.values(event.translations),
        });
    }

    public async getEvent(id: string): Promise<EventResponseEntity> {
        const { data: eventFromApi } = await this.eventsAPI.getEvent(id);

        return eventFromApi;
    }

    public async updateEvent(id: string, event: EventResponseEntity) {
        return await this.eventsAPI.updateEvent(id, {
            ...event,
            translations: Object.values(event.translations),
        });
    }

    private mapToEventsDetails(event: EventResponseEntity): EventDomainEntity {
        const country = this.viewMapper.getCountryDetails(event);

        const translation = this.getEventTranslation(event);

        return {
            id: event.id,
            name: translation?.name,
            country,
            status: event.status,
            month: event.month,
            createdAt: new Date(event.created_at).toLocaleString(),
        };
    }

    private getEventTranslation(event: EventResponseEntity): EventTranslation {
        if (!event.translations) {
            return null;
        }
        const generalLocale = this.localeStore.getGeneralLocale();
        const eventTransation = TranslationsService.getTranslationFromGroup(
            event.translations,
            generalLocale
        );

        delete eventTransation["id"];

        return eventTransation;
    }
}
