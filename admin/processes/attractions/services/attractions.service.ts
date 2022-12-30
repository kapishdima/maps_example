import {
    AttractionDomainEntity,
    AttractionResponseEntity,
} from "entities/attractions";

import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";
import { AttractionTranslation } from "entities/attractions";

import { IAttractionsAPI } from "../api/attractions";

export class AttractionService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly attractionsAPI: IAttractionsAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async fetchAttractions(
        options: GetListOptions
    ): Promise<ListResponse<AttractionDomainEntity[]>> {
        const attractionsFromApi = await this.attractionsAPI.getAttractions(
            options
        );

        if (!attractionsFromApi) {
            return null;
        }

        const attractionsWithDetails = attractionsFromApi.data.map(
            (attraction) => this.mapToAttractionsDetails(attraction)
        );

        return {
            data: attractionsWithDetails,
            meta: attractionsFromApi.meta,
        };
    }

    public async deleteAttraction(id: number): Promise<void> {
        await this.attractionsAPI.deleteAttraction(id);
    }

    public async createAttraction(
        attraction: AttractionResponseEntity
    ): Promise<AttractionResponseEntity> {
        return await this.attractionsAPI.createAttraction({
            ...attraction,
            translations: Object.values(attraction.translations),
        });
    }

    public async getAttraction(id: string): Promise<AttractionResponseEntity> {
        const { data: attractionFromApi } =
            await this.attractionsAPI.getAttraction(id);

        return attractionFromApi;
    }

    public async updateAttraction(
        id: string,
        attraction: AttractionResponseEntity
    ) {
        return await this.attractionsAPI.updateAttraction(id, {
            ...attraction,
            translations: Object.values(attraction.translations),
        });
    }

    private mapToAttractionsDetails(
        attraction: AttractionResponseEntity
    ): AttractionDomainEntity {
        const country = this.viewMapper.getCountryDetails(attraction);

        const translation = this.getAttractionTranslation(attraction);

        return {
            id: attraction.id,
            name: translation?.name,
            country,
            status: attraction.status,
            createdAt: new Date(attraction.created_at).toLocaleString(),
        };
    }

    private getAttractionTranslation(
        attraction: AttractionResponseEntity
    ): AttractionTranslation {
        if (!attraction.translations) {
            return null;
        }
        const generalLocale = this.localeStore.getGeneralLocale();
        const attractionTransation =
            TranslationsService.getTranslationFromGroup(
                attraction.translations,
                generalLocale
            );

        delete attractionTransation["id"];

        return attractionTransation;
    }
}
