import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { CountryResponseEntity } from "entities/countries";

import { CountryForm } from "./Form/CountryForm";
import { useCountriesService } from "../hooks/useCountriesService";
import { CountryHeading } from "./Form/CountryHeading";
import { useUpdateCountry } from "../hooks/useUpdateCountry";

export const CountryEditContent: React.FC = () => {
    const countriesService = useCountriesService();
    const navigate = useNavigate();

    const onUpdateSuccess = () => navigate(-1);

    const { data: country, isFetching } = useGetResourceById(
        "country",
        (id: string) => countriesService.getCountry(id)
    );
    const { mutate: updateCountry, isLoading } = useUpdateCountry(
        (id: string, country: CountryResponseEntity) =>
            countriesService.updateCountry(id, country),
        onUpdateSuccess
    );

    if (isFetching) {
        return <Loading minWidth="100vw" minHeight="100vh" />;
    }

    return (
        <Content
            header={
                <ContentHeader
                    title={
                        <Pane display="flex" alignItems="center">
                            <CountryHeading country={country} />
                        </Pane>
                    }
                    hasBackLink
                />
            }
        >
            <CountryForm
                onSubmit={updateCountry}
                defaultValue={country}
                isLoading={isLoading}
            />
        </Content>
    );
};
