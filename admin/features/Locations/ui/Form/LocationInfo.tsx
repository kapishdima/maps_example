import React from "react";

import { Pane } from "evergreen-ui";

import {
    CountriesSelect,
    RegionsSelect,
    TabPane,
    TagInput,
    TextInput,
    TranslatableTextInput,
} from "shared/ui";

type LocationInfoProps = {
    index: number;
};

export const LocationInfo: React.FC<LocationInfoProps> = ({ index }) => {
    return (
        <TabPane index={index} tab="Location">
            <Pane width="40%">
                <TranslatableTextInput
                    name="location.address"
                    label="Location address"
                    placeholder="Enter location address..."
                    isInline
                    required
                />
                <CountriesSelect name="location.country_id" />
                <RegionsSelect required name="location.region_id" />
                <TextInput
                    name="location.lat"
                    label="Latitude"
                    placeholder="Enter latitude..."
                />
                <TextInput
                    name="location.lng"
                    label="Longitude"
                    placeholder="Enter longitude..."
                />
                <TextInput
                    name="location.plus_code"
                    label="Plus code"
                    placeholder="Enter plus code..."
                />
                <TagInput
                    name="location.tags"
                    label="Tags"
                    placeholder="Select tag from list, or create your own"
                />
            </Pane>
        </TabPane>
    );
};
