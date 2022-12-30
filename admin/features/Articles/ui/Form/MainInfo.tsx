import React from "react";
import { FormField, majorScale, Pane } from "evergreen-ui";
import {
    CountriesSelect,
    MediaInputMany,
    MediaInputSingle,
    TabPane,
    TextInput,
} from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TextInput
                    name="title"
                    label="Article title"
                    placeholder="Enter article title..."
                />
                <MediaInputSingle
                    label="Article thumbnail"
                    name="thumbnail_id"
                    required
                />
                <FormField label="Gallery">
                    <MediaInputMany name="media" />
                </FormField>
            </Pane>
        </TabPane>
    );
};
