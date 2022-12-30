import { AgencyResponseEntity } from "entities/agencies";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface IAgenciesAPI {
    getAgencies: (
        options: GetListOptions
    ) => Promise<ListResponse<AgencyResponseEntity[]>>;
    getAgency: (id: string) => Promise<ListResponse<AgencyResponseEntity>>;
    deleteAgency: (id: number) => Promise<APIResponse<any>>;
    createAgency: (
        agency: AgencyResponseEntity
    ) => Promise<AgencyResponseEntity>;
    updateAgency: (id: string, agency: any) => Promise<void>;
}

export class AgenciesAPI implements IAgenciesAPI {
    constructor(private readonly client: IAPIClient) {}

    async getAgencies(
        options: GetListOptions
    ): Promise<ListResponse<AgencyResponseEntity[]>> {
        const { data: agencies } = await this.client.get<
            ListResponse<AgencyResponseEntity[]>
        >(this.createFetchAgenciesURL(options));

        return agencies;
    }

    async getAgency(id: string): Promise<ListResponse<AgencyResponseEntity>> {
        const { data: agency } = await this.client.get<
            ListResponse<AgencyResponseEntity>
        >(`/api/travelAgencies/${id}`);

        return agency;
    }

    async deleteAgency(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/travelAgencies/${id}`);
    }

    public async createAgency(
        agency: AgencyResponseEntity
    ): Promise<AgencyResponseEntity> {
        const { data: createdAgency } = await this.client.post<
            ListResponse<AgencyResponseEntity>
        >("/api/travelAgencies", agency);

        return createdAgency.data;
    }

    public async updateAgency(
        id: string,
        agency: AgencyResponseEntity
    ): Promise<void> {
        await this.client.patch(`/api/travelAgencies/${id}`, agency);
    }

    private createFetchAgenciesURL(options: GetListOptions) {
        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/travelAgencies?page=${page || 1}&per_page=${
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
