import React from "react";

import { Pane } from "evergreen-ui";

import { LocationList } from "./LocationsList";
import { LocationSearch } from "./LocationSearch";

export const LocationInput: React.FC = () => {
    return (
        <Pane
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
        >
            <LocationSearch />
            <LocationList />
        </Pane>
    );
};
