import {
    WineryDomainEntity,
    WineryRequestEntity,
    WineryResponseEntity,
} from "entities/winery";

import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";
import { WineryTranslation } from "entities/winery";

import { IWineriesAPI } from "../api/wineries";

export class WineryService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly wineriesAPI: IWineriesAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async fetchWineries(
        options: GetListOptions
    ): Promise<ListResponse<WineryDomainEntity[]>> {
        const wineriesFromApi = await this.wineriesAPI.getWineries(options);

        if (!wineriesFromApi) {
            return null;
        }

        const wineriesWithDetails = wineriesFromApi.data.map((winery) =>
            this.mapToWineriesDetails(winery)
        );

        return {
            data: wineriesWithDetails,
            meta: wineriesFromApi.meta,
        };
    }

    public async searchWinery(
        query: string
    ): Promise<ListResponse<WineryDomainEntity[]>> {
        const wineriesFromApi = await this.wineriesAPI.searchWineries(query);

        if (!wineriesFromApi) {
            return null;
        }

        const wineriesWithDetails = wineriesFromApi.data.map((winery) =>
            this.mapToWineriesDetails(winery)
        );

        return {
            data: wineriesWithDetails,
            meta: wineriesFromApi.meta,
        };
    }

    public async deleteWinery(id: number): Promise<void> {
        await this.wineriesAPI.deleteWinery(id);
    }

    public async createWinery(
        winery: WineryRequestEntity
    ): Promise<WineryResponseEntity> {
        return await this.wineriesAPI.createWinery({
            ...winery,
            translations: Object.values(winery.translations),
        });
    }

    public async getWinery(id: string): Promise<WineryResponseEntity> {
        const { data: wineryFromApi } = await this.wineriesAPI.getWinery(id);

        return wineryFromApi;
    }

    public async updateWinery(id: string, winery: WineryRequestEntity) {
        return await this.wineriesAPI.updateWinery(id, {
            ...winery,
            translations: Object.values(winery.translations),
        });
    }

    private mapToWineriesDetails(
        winery: WineryResponseEntity
    ): WineryDomainEntity {
        const country = this.viewMapper.getCountryDetails(winery);

        const translation = this.getWineryTranslation(winery);
        return {
            id: winery.id,
            name: translation?.name,
            country,
            status: winery.status,
            createdAt: new Date(winery.created_at).toLocaleString(),
        };
    }

    private getWineryTranslation(
        winery: WineryResponseEntity
    ): WineryTranslation {
        if (!winery.translations) {
            return null;
        }
        const generalLocale = this.localeStore.getGeneralLocale();
        const wineryTransation = TranslationsService.getTranslationFromGroup(
            winery.translations,
            generalLocale
        );

        delete wineryTransation["id"];

        return wineryTransation;
    }
}
