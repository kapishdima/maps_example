import React from "react";

import { AuthStatusTypes, useAuthStore } from "processes/auth";

import { CountryDomainEntity } from "entities/countries";
import { LocaleDomainEntity } from "entities/locales";

import {
    PayingPossibilityDomainEntity,
    TypeOfBusinessDomainEntity,
    StaffLangsDomainEntity,
    TourOptionDomainEntity,
    WineCategoryDomainEntity,
} from "entities/common-data";

import { useCommonData } from "app/hooks";
import { Loading } from "shared/ui";
import { useQuery } from "react-query";
import { observer } from "mobx-react-lite";

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

const defaultCommonDataContext: CommonData = {
    countries: [],
    currentCountry: null,
    locales: [],
    generalLocale: null,
    tourOptions: [],
    typeOfBusiness: [],
    payingPossibilities: [],
    staffLangs: [],
    wineCategories: [],
};

export const CommonDataContext = React.createContext<CommonData>(
    defaultCommonDataContext
);

export const withCommonData = (Component: React.ComponentType<any>) =>
    observer(() => {
        const authStore = useAuthStore();
        const { prepareCommonData } = useCommonData();

        const { data: commonData, isFetching } = useQuery(
            ["common-data", authStore.authorizationStatus],
            prepareCommonData,
            {
                enabled:
                    authStore.authorizationStatus ===
                    AuthStatusTypes.AUTHORIZED,
            }
        );

        if (isFetching) {
            return (
                <Loading
                    minHeight="100vh"
                    minWidth="100vw"
                    title="Preparing common data..."
                    forwardFront
                />
            );
        }

        return (
            <CommonDataContext.Provider
                value={commonData || defaultCommonDataContext}
            >
                <Component />
            </CommonDataContext.Provider>
        );
    });
