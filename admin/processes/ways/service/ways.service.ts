import { merge } from "lodash";

import {
    WayDomainEntity,
    WayRequestEntity,
    WayResponseEntity,
    WayTranslations,
} from "entities/ways";

import { GetListOptions, ListResponse } from "shared/api";
import { LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";

import { IWaysAPI } from "../api/ways.api";

export class WaysService {
    private viewMapper: ViewMapperService;
    private localeStore: LocalesStore;

    constructor(private readonly waysApi: IWaysAPI) {
        this.viewMapper = new ViewMapperService();
        this.localeStore = new LocalesStore();
    }

    async getWays(
        options: GetListOptions
    ): Promise<ListResponse<WayDomainEntity[]>> {
        const { data: ways, meta } = await this.waysApi.getWays(options);

        const waysWithDetails: WayDomainEntity[] = ways.map((way) =>
            this.toWayViewDetails(way)
        );

        return {
            data: waysWithDetails,
            meta,
        };
    }

    async getWay(id: string): Promise<WayResponseEntity> {
        const { data: way } = await this.waysApi.getWay(id);

        return way;
    }

    async updateWay(id: string, way: WayRequestEntity): Promise<void> {
        await this.waysApi.updateWay(id, {
            ...way,
            translations: Object.values(way.translations),
        });
    }

    async createWay(way: WayRequestEntity): Promise<WayResponseEntity> {
        return await this.waysApi.createWay({
            ...way,
            translations: Object.values(way.translations),
        });
    }

    async deleteWay(id: number): Promise<void> {
        return await this.waysApi.deleteWay(id);
    }

    private toWayViewDetails(way: WayResponseEntity): WayDomainEntity {
        const country = this.viewMapper.getCountryDetails(way);
        const translations: WayTranslations = this.getWayTranslations(way);

        return merge(
            way,
            { country, locations: null, media: null },
            translations
        );
    }

    private getWayTranslations(way: WayResponseEntity) {
        if (!way.translations) {
            return null;
        }

        const generalLocale = this.localeStore.getGeneralLocale();
        const wineryTransation = TranslationsService.getTranslationFromGroup(
            way.translations,
            generalLocale
        );

        delete wineryTransation["id"];

        return wineryTransation;
    }
}
