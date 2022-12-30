import { HorecaResponseEntity } from "entities/horeca";
import {
    APIResponse,
    GetListOptions,
    IAPIClient,
    ListResponse,
} from "shared/api";
import { ListFilter } from "shared/api/types";

export interface IHorecasAPI {
    getHorecas: (
        options: GetListOptions
    ) => Promise<ListResponse<HorecaResponseEntity[]>>;
    getHoreca: (id: string) => Promise<ListResponse<HorecaResponseEntity>>;
    deleteHoreca: (id: number) => Promise<APIResponse<any>>;
    createHoreca: (
        horeca: HorecaResponseEntity
    ) => Promise<HorecaResponseEntity>;
    updateHoreca: (id: string, horeca: HorecaResponseEntity) => Promise<void>;
}

export class HorecasAPI implements IHorecasAPI {
    constructor(private readonly client: IAPIClient) {}

    async getHorecas(
        options: GetListOptions
    ): Promise<ListResponse<HorecaResponseEntity[]>> {
        const { data: horecas } = await this.client.get<
            ListResponse<HorecaResponseEntity[]>
        >(this.createFetchHorecasURL(options));

        return horecas;
    }

    async getHoreca(id: string): Promise<ListResponse<HorecaResponseEntity>> {
        const { data: horeca } = await this.client.get<
            ListResponse<HorecaResponseEntity>
        >(`/api/horecas/${id}`);

        return horeca;
    }

    async deleteHoreca(id: number): Promise<APIResponse<any>> {
        return await this.client.delete(`/api/horecas/${id}`);
    }

    public async createHoreca(
        horeca: HorecaResponseEntity
    ): Promise<HorecaResponseEntity> {
        const { data: createdHoreca } = await this.client.post<
            ListResponse<HorecaResponseEntity>
        >("/api/horecas", horeca);

        return createdHoreca.data;
    }

    public async updateHoreca(
        id: string,
        horeca: HorecaResponseEntity
    ): Promise<void> {
        await this.client.patch(`/api/horecas/${id}`, horeca);
    }

    private createFetchHorecasURL(options: GetListOptions) {
        const { page, size } = options;
        const filterQueryParams = this.createFiltersURL(options.filters);

        return `/api/horecas?page=${page || 1}&per_page=${
            size || 10
        }&${filterQueryParams}`;
    }

    private createFiltersURL(filters: ListFilter[]) {
        if (!filters || !filters.length) {
            return "";
        }

        let url = "";

        for (const filter of filters) {
            for (const [key, value] of Object.entries(filter)) {
                url = url + [key, value].join("=") + "&";
            }
        }

        return url;
    }
}
