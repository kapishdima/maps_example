import { CommonDataEntity } from "entities/common-data";
import { ICountriesStore, CountriesStore } from "processes/countries";
import { ILocalesStore, LocalesStore } from "processes/locales";
import {
    IPayingPossibilitiesStore,
    PayingPossibilitiesStore,
} from "processes/payingPossibilities/store/paying-possibilities.store";
import { ITourOptionsStore, TourOptionsStore } from "processes/tourOptions";
import {
    IWineCategoriesStore,
    WineCategoriesStore,
} from "processes/wineCategories";
import {
    ITypeOfBusinessStore,
    TypeOfBusinessStore,
} from "processes/typeOfBusiness";
import { IUserStore, UserStore } from "processes/user";
import { UserDomainEntity } from "entities/user";

export class CommonDataService {
    private countryStore: ICountriesStore;
    private localesStore: ILocalesStore;
    private typeOfBussinesStore: ITypeOfBusinessStore;
    private tourOptionsStore: ITourOptionsStore;
    private wineCategoriesStore: IWineCategoriesStore;
    private payingPossibilitiesStore: IPayingPossibilitiesStore;
    private userStore: IUserStore;

    constructor() {
        this.countryStore = new CountriesStore();
        this.localesStore = new LocalesStore();
        this.typeOfBussinesStore = new TypeOfBusinessStore();
        this.tourOptionsStore = new TourOptionsStore();
        this.wineCategoriesStore = new WineCategoriesStore();
        this.payingPossibilitiesStore = new PayingPossibilitiesStore();
        this.userStore = new UserStore();
    }

    public getCommonData(): CommonDataEntity {
        return {
            countries: this.countryStore.getAllCountries(),
            currentCountry: this.countryStore.getCurrentCountry(),
            locales: this.localesStore.getAllLocales(),
            generalLocale: this.localesStore.getGeneralLocale(),
            typeOfBussines: this.typeOfBussinesStore.getAllTypeOfBusiness(),
            tourOptions: this.tourOptionsStore.getAllTourOptions(),
            wineCategories: this.wineCategoriesStore.getAllWineCategories(),
            payingPossibilities:
                this.payingPossibilitiesStore.getAllPayingPossibilities(),
            currentUser: this.userStore.getUser(),
        };
    }

    public getRequiredLocales = (): number[] => {
        const generalLocale = this.localesStore.getGeneralLocale();
        const country = this.countryStore.getCurrentCountry();
        if (country) {
            return [generalLocale.id, country.localeId];
        }

        return [generalLocale.id];
    };

    public getUser = (): UserDomainEntity => {
        return this.userStore.getUser();
    };
}
