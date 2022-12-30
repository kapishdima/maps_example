import React from "react";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, Loading } from "shared/ui";
import { useQuery } from "react-query";

import { BlackSeaResponseEntity } from "entities/black-sea";

import { BlackSeaForm } from "./Form/BlackSeaForm";
import { useBlackSeaService } from "../hooks/useBlackSeaService";
import { BlackSeaHeading } from "./Form/BlackSeaHeading";
import { useUpdateBlackSea } from "../hooks/useUpdateBlackSea";
import { useLocationsService } from "processes/locations";

export const BlackSeaEditContent: React.FC = () => {
    const blackSeaService = useBlackSeaService();
    const locationsService = useLocationsService();

    const { data: blackSea, isFetching } = useQuery("blackSea", async () => {
        const blackSea = await blackSeaService.getBlackSea();

        if (!blackSea.locations.length) {
            return blackSea;
        }

        const locations = await locationsService.getLocationsByIds(
            blackSea.locations.map(({ id }) => id.toString())
        );

        return {
            ...blackSea,
            locations,
        };
    });
    const { mutate: updateBlackSea, isLoading } = useUpdateBlackSea(
        (blackSea: BlackSeaResponseEntity) => {
            return blackSeaService.updateBlackSea(blackSea);
        }
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
                            <BlackSeaHeading blackSea={blackSea} />
                        </Pane>
                    }
                    hasBackLink={false}
                />
            }
        >
            <BlackSeaForm
                onSubmit={updateBlackSea}
                defaultValue={blackSea}
                isLoading={isLoading}
            />
        </Content>
    );
};
