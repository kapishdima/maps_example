import { useCommonDataContext } from "app/hooks";
import { useGetMe } from "processes/auth";
import { useLocales } from "processes/locales";
import { useEffect, useState } from "react";

const toCapitalize = (str: string) =>
    str.replace(/./, (letter) => letter.toUpperCase());

export const useUILocales = () => {
    const { fetchUser } = useGetMe();
    const { generalLocale, locales, currentCountry } = useCommonDataContext();

    if (!generalLocale || !locales) {
        return [];
    }

    const defaultLocale = {
        label: toCapitalize(generalLocale.name),
        id: generalLocale.id,
    };
    const [uiLocales, setUILocales] = useState([defaultLocale]);

    const geUserLocale = () => {
        const currentLocale = locales.find(
            (locale) => locale.id === currentCountry?.localeId
        );

        if (!currentLocale) {
            return;
        }

        return {
            id: currentLocale.id,
            label: toCapitalize(currentLocale.name),
        };
    };

    const prepareLocales = async () => {
        const user = await fetchUser();

        if (!user) {
            return;
        }

        const visibleLocales =
            user.role === "superadmin"
                ? locales.map((l) => ({
                      label: toCapitalize(l.name),
                      id: l.id,
                  }))
                : [defaultLocale, geUserLocale()];

        setUILocales((_locales) => visibleLocales);
    };

    useEffect(() => {
        prepareLocales();
    }, [generalLocale, locales]);

    return uiLocales;
};
