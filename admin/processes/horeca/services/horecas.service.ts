import { HorecaDomainEntity, HorecaResponseEntity } from "entities/horeca";

import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";
import { HorecaTranslation } from "entities/horeca";

import { IHorecasAPI } from "../api/horecas";

export class HorecaService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly horecasAPI: IHorecasAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async fetchHorecas(
        options: GetListOptions
    ): Promise<ListResponse<HorecaDomainEntity[]>> {
        const horecasFromApi = await this.horecasAPI.getHorecas(options);

        if (!horecasFromApi) {
            return null;
        }

        const horecasWithDetails = horecasFromApi.data.map((horeca) =>
            this.mapToHorecasDetails(horeca)
        );

        return {
            data: horecasWithDetails,
            meta: horecasFromApi.meta,
        };
    }

    public async deleteHoreca(id: number): Promise<void> {
        await this.horecasAPI.deleteHoreca(id);
    }

    public async createHoreca(
        horeca: HorecaResponseEntity
    ): Promise<HorecaResponseEntity> {
        return await this.horecasAPI.createHoreca({
            ...horeca,
            translations: Object.values(horeca.translations),
        });
    }

    public async getHoreca(id: string): Promise<HorecaResponseEntity> {
        const { data: horecaFromApi } = await this.horecasAPI.getHoreca(id);

        return horecaFromApi;
    }

    public async updateHoreca(id: string, horeca: HorecaResponseEntity) {
        return await this.horecasAPI.updateHoreca(id, {
            ...horeca,
            translations: Object.values(horeca.translations),
        });
    }

    private mapToHorecasDetails(
        horeca: HorecaResponseEntity
    ): HorecaDomainEntity {
        const country = this.viewMapper.getCountryDetails(horeca);

        const translation = this.getHorecaTranslation(horeca);

        return {
            id: horeca.id,
            name: translation?.name,
            country,
            status: horeca.status,
            createdAt: new Date(horeca.created_at).toLocaleString(),
        };
    }

    private getHorecaTranslation(
        horeca: HorecaResponseEntity
    ): HorecaTranslation {
        if (!horeca.translations) {
            return null;
        }
        const generalLocale = this.localeStore.getGeneralLocale();
        const horecaTransation = TranslationsService.getTranslationFromGroup(
            horeca.translations,
            generalLocale
        );

        delete horecaTransation["id"];

        return horecaTransation;
    }
}
