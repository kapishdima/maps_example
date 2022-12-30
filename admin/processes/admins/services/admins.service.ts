import { AdminResponseEntity, AdminDomainEntity } from "entities/admins";

import { ILocalesStore, LocalesStore } from "processes/locales";

import { ViewMapperService } from "processes/view-mapper";

import { GetListOptions, ListResponse } from "shared/api";

import { IAdminsAPI } from "../api/admins";

export class AdminService {
    private localeStore: ILocalesStore;
    private viewMapper: ViewMapperService;

    constructor(private readonly adminsAPI: IAdminsAPI) {
        this.localeStore = new LocalesStore();
        this.viewMapper = new ViewMapperService();
    }

    public async fetchAdmins(
        options: GetListOptions
    ): Promise<ListResponse<AdminDomainEntity[]>> {
        const adminsFromApi = await this.adminsAPI.getAdmins(options);

        if (!adminsFromApi) {
            return null;
        }

        const adminsWithDetails = adminsFromApi.data.map((admin) =>
            this.mapToAdminsDetails(admin)
        );

        return {
            data: adminsWithDetails,
            meta: adminsFromApi.meta,
        };
    }

    public async deleteAdmin(id: number): Promise<void> {
        await this.adminsAPI.deleteAdmin(id);
    }

    public async createAdmin(
        admin: AdminResponseEntity
    ): Promise<AdminResponseEntity> {
        return await this.adminsAPI.createAdmin(admin);
    }

    public async getAdmin(id: string): Promise<AdminResponseEntity> {
        const { data: adminFromApi } = await this.adminsAPI.getAdmin(id);

        return adminFromApi;
    }

    public async updateAdmin(id: string, admin: AdminResponseEntity) {
        return await this.adminsAPI.updateAdmin(id, admin);
    }

    private mapToAdminsDetails(admin: AdminResponseEntity): AdminDomainEntity {
        const country = this.viewMapper.getCountryDetails(admin);

        return {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            country,
            createdAt: new Date(admin.created_at).toLocaleString(),
        };
    }
}
