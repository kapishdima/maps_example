import { CountryDomainEntity } from "entities/countries";
import { LocaleDomainEntity } from "entities/locales";
import { UserDomainEntity } from "entities/user";
import { PayingPossibilityDomainEntity } from "./paying-possibilities/paying-possibilities-domain";
import { TourOptionDomainEntity } from "./tour-option/tour-option-domain";
import { WineCategoryDomainEntity } from "./wine-categories/wine-category-domain";
import { TypeOfBusinessDomainEntity } from "./type-of-business/type-of-business-domain";

export type CommonDataEntity = {
    countries: CountryDomainEntity[];
    currentCountry: CountryDomainEntity;
    locales: LocaleDomainEntity[];
    generalLocale: LocaleDomainEntity;
    typeOfBussines: TypeOfBusinessDomainEntity[];
    tourOptions: TourOptionDomainEntity[];
    wineCategories: WineCategoryDomainEntity[];
    payingPossibilities: PayingPossibilityDomainEntity[];
    currentUser: UserDomainEntity;
};
