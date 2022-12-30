import { SeodataDomainEntity, SeodataResponseEntity } from "entities/seodatas";

import { ILocalesStore, LocalesStore } from "processes/locales";
import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";

import { ISeodatasAPI } from "../api/seodatas";

export class SeodataService {
    private viewMapper: ViewMapperService;

    constructor(private readonly seodatasAPI: ISeodatasAPI) {
        this.viewMapper = new ViewMapperService();
    }

    public async fetchSeodatas(
        options: GetListOptions
    ): Promise<ListResponse<SeodataDomainEntity[]>> {
        const seodatasFromApi = await this.seodatasAPI.getSeodatas(options);

        if (!seodatasFromApi) {
            return null;
        }

        const seodatasWithDetails = seodatasFromApi.data.map((seodata) =>
            this.mapToSeodatasDetails(seodata)
        );

        return {
            data: seodatasWithDetails,
            meta: seodatasFromApi.meta,
        };
    }

    public async deleteSeodata(id: number): Promise<void> {
        await this.seodatasAPI.deleteSeodata(id);
    }

    public async createSeodata(seodata: SeodataResponseEntity): Promise<void> {
        await this.seodatasAPI.createSeodata(seodata);
    }

    public async getSeodata(id: string): Promise<SeodataResponseEntity> {
        const { data: seodataFromApi } = await this.seodatasAPI.getSeodata(id);

        return seodataFromApi;
    }

    public async updateSeodata(id: string, seodata: SeodataResponseEntity) {
        return await this.seodatasAPI.updateSeodata(id, seodata);
    }

    private mapToSeodatasDetails(
        seodata: SeodataResponseEntity
    ): SeodataDomainEntity {
        return seodata;
    }
}
