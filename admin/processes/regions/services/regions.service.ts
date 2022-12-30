import { RegionDomainEntity, RegionResponseEntity } from "entities/region";
import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";
import { GetListOptions } from "shared/api";
import { IRegionAPI } from "../api/regions.api";

export class RegionsService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly regionAPI: IRegionAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    async fetchRegions(options?: GetListOptions) {
        const regionsFromApi = await this.regionAPI.fetchRegions(options);

        if (!regionsFromApi) {
            return null;
        }

        const regions: RegionDomainEntity[] = regionsFromApi.data.map(
            (region) => {
                return {
                    id: region.id,
                    country: this.viewMapper.getCountryDetails(region),
                    name: this.getRegionTranslation(region).name,
                };
            }
        );

        return {
            data: regions,
            meta: regionsFromApi.meta,
        };
    }

    async getRegion(id: string) {
        const { data: region } = await this.regionAPI.getRegion(id);

        return region;
    }

    async createRegion(region: RegionResponseEntity) {
        const createdRegion = await this.regionAPI.createRegion(region);

        return createdRegion.data;
    }

    async updateRegion(id: string, region: RegionResponseEntity) {
        return this.regionAPI.updateRegion(id, region);
    }

    async deleteRegion(id: number) {
        return this.regionAPI.deleteRegion(id);
    }

    private getRegionTranslation(region: RegionResponseEntity): {
        name: string;
    } {
        if (!region.translations) {
            return null;
        }
        const generalLocale = this.localeStore.getGeneralLocale();
        const regionTransation = TranslationsService.getTranslationFromGroup(
            region.translations,
            generalLocale
        );

        return regionTransation;
    }
}
