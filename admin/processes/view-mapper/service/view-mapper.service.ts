import { CommonDataService } from "processes/common-data";

export class ViewMapperService {
    private commonDataService: CommonDataService;
    constructor() {
        this.commonDataService = new CommonDataService();
    }

    getCountryDetails<D extends { country_id: number }>(data: D) {
        const { countries } = this.commonDataService.getCommonData();

        return countries.find((country) => country.id === data.country_id);
    }

    getTourOptionsDetails<D extends { tour_options: number[] }>(data: D) {
        const { tourOptions } = this.commonDataService.getCommonData();

        return tourOptions.filter((tourOption) =>
            data.tour_options.includes(tourOption.id)
        );
    }

    getTypesOfBussinesDetails<D extends { type_of_businesses: number[] }>(
        data: D
    ) {
        const { typeOfBussines } = this.commonDataService.getCommonData();

        return typeOfBussines.filter((typeOfBusiness) =>
            data.type_of_businesses.includes(typeOfBusiness.id)
        );
    }

    getPayingPossibilities<D extends { paying_possibilities: number[] }>(
        data: D
    ) {
        const { payingPossibilities } = this.commonDataService.getCommonData();

        return payingPossibilities.filter((payingPossibility) =>
            data.paying_possibilities.includes(payingPossibility.id)
        );
    }
}
