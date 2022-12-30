import { GrapeDomainEntity, GrapeResponseEntity } from "entities/grapes";

import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";
import { GrapeTranslation } from "entities/grapes";

import { IGrapesAPI } from "../api/grapes";

export class GrapeService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly grapesAPI: IGrapesAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async fetchGrapes(
        options: GetListOptions
    ): Promise<ListResponse<GrapeDomainEntity[]>> {
        const grapesFromApi = await this.grapesAPI.getGrapes(options);

        if (!grapesFromApi) {
            return null;
        }

        const grapesWithDetails = grapesFromApi.data.map((grape) =>
            this.mapToGrapesDetails(grape)
        );

        return {
            data: grapesWithDetails,
            meta: grapesFromApi.meta,
        };
    }

    public async deleteGrape(id: number): Promise<void> {
        await this.grapesAPI.deleteGrape(id);
    }

    public async createGrape(
        grape: GrapeResponseEntity
    ): Promise<GrapeResponseEntity> {
        return await this.grapesAPI.createGrape({
            ...grape,
            translations: Object.values(grape.translations),
        });
    }

    public async getGrape(id: string): Promise<GrapeResponseEntity> {
        const { data: grapeFromApi } = await this.grapesAPI.getGrape(id);

        return grapeFromApi;
    }

    public async updateGrape(id: string, grape: GrapeResponseEntity) {
        return await this.grapesAPI.updateGrape(id, {
            ...grape,
            translations: Object.values(grape.translations),
        });
    }

    private mapToGrapesDetails(grape: GrapeResponseEntity): GrapeDomainEntity {
        const translation = this.getGrapeTranslation(grape);

        return {
            id: grape.id,
            name: translation?.name,
            status: grape.status,
            createdAt: new Date(grape.created_at).toLocaleString(),
        };
    }

    private getGrapeTranslation(grape: GrapeResponseEntity): GrapeTranslation {
        if (!grape.translations) {
            return null;
        }
        const generalLocale = this.localeStore.getGeneralLocale();
        const grapeTransation = TranslationsService.getTranslationFromGroup(
            grape.translations,
            generalLocale
        );

        delete grapeTransation["id"];

        return grapeTransation;
    }
}
