import React from "react";
import { majorScale, Pane } from "evergreen-ui";
import {
    CountriesSelect,
    MediaInputMany,
    TabPane,
    TranslatableTextInput,
    TextInput,
    TranslatableTextEditorInput,
} from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextInput
                    name="name"
                    label="Attraction name"
                    placeholder="Enter attraction name..."
                    required
                />
                <TranslatableTextEditorInput
                    name="description"
                    label="Attraction description"
                    placeholder="Enter attraction description..."
                />
                <CountriesSelect />
                <TextInput
                    name="youtube"
                    label="Youtube link"
                    placeholder="Paste youtube link..."
                />
            </Pane>
            <MediaInputMany name="media" />
        </TabPane>
    );
};
