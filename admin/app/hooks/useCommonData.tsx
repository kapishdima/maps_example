import { useCountries } from "processes/countries";
import { useLocales } from "processes/locales";
import { usePayingPossibilities } from "processes/payingPossibilities/hooks/usePayingPossibilities";
import { useTourOptions } from "processes/tourOptions";
import { useTypeOfBusiness } from "processes/typeOfBusiness";
import { useStaffLangs } from "processes/staff-langs/hooks/useStaffLangs";

import {
    TourOptionDomainEntity,
    WineCategoryDomainEntity,
    TypeOfBusinessDomainEntity,
    PayingPossibilityDomainEntity,
    StaffLangsDomainEntity,
} from "entities/common-data";
import { CountryDomainEntity } from "entities/countries";
import { LocaleDomainEntity } from "entities/locales";
import { RegionDomainEntity } from "entities/region";
import { useWineCategories } from "processes/wineCategories";

export type CommonData = {
    countries: CountryDomainEntity[];
    currentCountry: CountryDomainEntity;
    locales: LocaleDomainEntity[];
    generalLocale: LocaleDomainEntity;
    tourOptions: TourOptionDomainEntity[];
    wineCategories: WineCategoryDomainEntity[];
    typeOfBusiness: TypeOfBusinessDomainEntity[];
    payingPossibilities: PayingPossibilityDomainEntity[];
    staffLangs: StaffLangsDomainEntity[];
};

export const useCommonData = () => {
    const { fetchAndSaveCountries, clearCountries } = useCountries();
    const { fetchAndSaveLocales, clearLocales } = useLocales();
    const { fetchAndSaveTourOptions, clearTourOptions } = useTourOptions();
    const { fetchAndSaveWineCategories, clearWineCategories } =
        useWineCategories();

    const { fetchAndSaveTypeOfBusiness, clearTypeOfBussiness } =
        useTypeOfBusiness();
    const { fetchAndSavePayingPossibilities, clearPayingPossibilities } =
        usePayingPossibilities();
    const { fetchAndSaveStaffLangs, clearStaffLangs } = useStaffLangs();

    const prepareCommonData = async () => {
        try {
            const response = await Promise.all([
                fetchAndSaveCountries(),
                fetchAndSaveLocales(),
                fetchAndSaveTourOptions(),
                fetchAndSaveTypeOfBusiness(),
                fetchAndSavePayingPossibilities(),
                fetchAndSaveStaffLangs(),
                fetchAndSaveWineCategories(),
            ]);
            return fromResponse(response);
        } catch (error) {
            throw error;
        }
    };

    const clearCommonData = () => {
        clearCountries();
        clearLocales();
        clearTourOptions();
        clearTypeOfBussiness();
        clearPayingPossibilities();
        clearStaffLangs();
        clearWineCategories();
    };

    const fromResponse = (response): CommonData =>
        response.reduce((acc, value) => {
            return {
                ...acc,
                ...value,
            };
        }, {});

    return {
        prepareCommonData,
        clearCommonData,
    };
};
