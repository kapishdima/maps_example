import {
    SettingsDomainEntity,
    SettingsResponseEntity,
} from "entities/settings";

import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";
import { SettingsTranslation } from "entities/settings";

import { ISettingsAPI } from "../api/settings";

export class SettingsService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly settingsAPI: ISettingsAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async getSettings(id: string): Promise<any> {
        const { data: settingsFromApi } = await this.settingsAPI.getSettings(
            id
        );

        return settingsFromApi;
    }

    public async updateSettings(id: string, settings: SettingsResponseEntity) {
        return await this.settingsAPI.updateSettings(id, settings);
    }
}
