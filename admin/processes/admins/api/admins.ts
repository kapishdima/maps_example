import { AdminResponseEntity } from "entities/admins";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface IAdminsAPI {
    getAdmins: (
        options: GetListOptions
    ) => Promise<ListResponse<AdminResponseEntity[]>>;
    getAdmin: (id: string) => Promise<ListResponse<AdminResponseEntity>>;
    deleteAdmin: (id: number) => Promise<APIResponse<any>>;
    createAdmin: (admin: AdminResponseEntity) => Promise<AdminResponseEntity>;
    updateAdmin: (id: string, admin: AdminResponseEntity) => Promise<void>;
}

export class AdminsAPI implements IAdminsAPI {
    constructor(private readonly client: IAPIClient) {}

    async getAdmins(
        options: GetListOptions
    ): Promise<ListResponse<AdminResponseEntity[]>> {
        const { data: admins } = await this.client.get<
            ListResponse<AdminResponseEntity[]>
        >(this.createFetchAdminsURL(options));

        return admins;
    }

    async getAdmin(id: string): Promise<ListResponse<AdminResponseEntity>> {
        const { data: admin } = await this.client.get<
            ListResponse<AdminResponseEntity>
        >(`/api/admins/${id}`);

        return admin;
    }

    async deleteAdmin(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/admins/${id}`);
    }

    public async createAdmin(
        admin: AdminResponseEntity
    ): Promise<AdminResponseEntity> {
        const { data: createdAdmin } = await this.client.post<
            ListResponse<AdminResponseEntity>
        >("/api/admins", admin);

        return createdAdmin.data;
    }

    public async updateAdmin(
        id: string,
        admin: AdminResponseEntity
    ): Promise<void> {
        await this.client.patch(`/api/admins/${id}`, admin);
    }

    private createFetchAdminsURL(options: GetListOptions) {
        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/admins?page=${page || 1}&per_page=${
            size || 10
        }&${filterQueryParams}`;
    }

    private createFiltersURL(filters: ListFilter[]) {
        if (!filters || !filters.length) {
            return "";
        }

        let url = "";
        // FIXME: Это че такое?
        for (const filter of filters) {
            for (const [key, value] of Object.entries(filter)) {
                url = url + [key, value].join("=") + "&";
            }
        }

        return url;
    }
}
