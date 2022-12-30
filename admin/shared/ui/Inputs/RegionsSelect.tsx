import React from "react";

import { SelectInput } from "./SelectInput";
import { useAuthStore } from "processes/auth";
import { RegionsServiceProvider } from "features/Regions";
import { useRegionsService } from "features/Regions/hooks/useRegionsService";
import { useQuery } from "react-query";
import { Pane } from "evergreen-ui";
import { Loading } from "../Layout/Loading";

type RegionsSelectProps = {
    name?: string;
    required?: boolean;
};

export const RegionsSelect: React.FC<RegionsSelectProps> = ({
    name,
    required,
}) => {
    return (
        <RegionsServiceProvider>
            <RegionsSelectView name={name} required={required} />
        </RegionsServiceProvider>
    );
};

export const RegionsSelectView: React.FC<RegionsSelectProps> = ({
    name,
    required,
}) => {
    const regionsService = useRegionsService();
    const { user } = useAuthStore();

    const { data, isFetching } = useQuery("regions-select", async () => {
        const regionsFromApi = await regionsService.fetchRegions();

        if (!regionsFromApi) {
            return [];
        }

        return user.role === "superadmin"
            ? regionsFromApi?.data.map((region) => ({
                  label: region.name,
                  value: region.id,
              }))
            : regionsFromApi?.data
                  .filter((region) => region.country.id === user.countryId)
                  .map((region) => ({
                      label: region.name,
                      value: region.id,
                  }));
    });

    if (isFetching) {
        return (
            <Pane maxWidth="100%" maxHeight="32px">
                <Loading minHeight="32px" />
            </Pane>
        );
    }

    return (
        <SelectInput
            required={required}
            name={name || "region_id"}
            options={data}
            title="Regions"
            label="Regions"
            buttonText="Select region"
            hasFilter={false}
            height={180}
        />
    );
};
