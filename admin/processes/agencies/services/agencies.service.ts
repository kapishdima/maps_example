import { AgencyDomainEntity, AgencyResponseEntity } from "entities/agencies";

import { ILocalesStore, LocalesStore } from "processes/locales";
import { TranslationsService } from "processes/translations";
import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";
import { AgencyTranslation } from "entities/agencies";

import { IAgenciesAPI } from "../api/agencies";

export class AgencyService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly agenciesAPI: IAgenciesAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async fetchAgencies(
        options: GetListOptions
    ): Promise<ListResponse<AgencyDomainEntity[]>> {
        const agenciesFromApi = await this.agenciesAPI.getAgencies(options);

        if (!agenciesFromApi) {
            return null;
        }

        const agenciesWithDetails = agenciesFromApi.data.map((agency) =>
            this.mapToAgenciesDetails(agency)
        );

        return {
            data: agenciesWithDetails,
            meta: agenciesFromApi.meta,
        };
    }

    public async deleteAgency(id: number): Promise<void> {
        await this.agenciesAPI.deleteAgency(id);
    }

    public async createAgency(
        agency: AgencyResponseEntity
    ): Promise<AgencyResponseEntity> {
        return await this.agenciesAPI.createAgency({
            ...agency,
            translations: Object.values(agency.translations).map(
                (translation) => ({
                    ...translation,
                    description: translation.description || "",
                })
            ),
        });
    }

    public async getAgency(id: string): Promise<AgencyResponseEntity> {
        const { data: agencyFromApi } = await this.agenciesAPI.getAgency(id);

        return agencyFromApi;
    }

    public async updateAgency(id: string, agency: AgencyResponseEntity) {
        return await this.agenciesAPI.updateAgency(id, {
            ...agency,
            translations: Object.values(agency.translations).map(
                (translation) => ({
                    ...translation,
                    description: translation.description || "",
                })
            ),
        });
    }

    private mapToAgenciesDetails(
        agency: AgencyResponseEntity
    ): AgencyDomainEntity {
        const country = this.viewMapper.getCountryDetails(agency);

        const translation = this.getAgencyTranslation(agency);

        return {
            id: agency.id,
            name: translation?.name,
            country,
            status: agency.status,
            createdAt: new Date(agency.created_at).toLocaleString(),
        };
    }

    private getAgencyTranslation(
        agency: AgencyResponseEntity
    ): AgencyTranslation {
        if (!agency.translations) {
            return null;
        }
        const generalLocale = this.localeStore.getGeneralLocale();
        const agencyTransation = TranslationsService.getTranslationFromGroup(
            agency.translations,
            generalLocale
        );

        delete agencyTransation["id"];

        return agencyTransation;
    }
}
