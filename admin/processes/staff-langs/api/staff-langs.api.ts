import { StaffLangsResponseEntity } from "entities/common-data";
import { IAPIClient } from "shared/api";

export interface IStaffLangsAPI {
    getStaffLangs: () => Promise<StaffLangsResponseEntity[]>;
}

export class StaffLangsAPI implements IStaffLangsAPI {
    constructor(private readonly client: IAPIClient) {}

    public async getStaffLangs(): Promise<StaffLangsResponseEntity[]> {
        const { data: staffLangs } = await this.client.get<{
            data: StaffLangsResponseEntity[];
        }>("/api/staffLangs");

        return staffLangs.data;
    }
}
