import React from "react";
import { majorScale, Pane } from "evergreen-ui";
import {
    MediaInputSingle,
    MediaInputMany,
    TabPane,
    TranslatableTextInput,
    TranslatableTextEditorInput,
} from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextInput
                    name="name"
                    label="Grape variety name"
                    placeholder="Enter grape variety name..."
                />

                <TranslatableTextInput
                    name="taste"
                    label="Taste"
                    placeholder="Enter taste..."
                />
                <TranslatableTextInput
                    name="aroma"
                    label="Aroma"
                    placeholder="Enter aroma..."
                />
                <TranslatableTextInput
                    name="type"
                    label="Type"
                    placeholder="Enter grape variety name..."
                />
                <TranslatableTextInput
                    name="color"
                    label="Color"
                    placeholder="Enter grape variety name..."
                />
                <TranslatableTextEditorInput
                    name="description"
                    label="Grape variety description"
                    placeholder="..."
                />
                <MediaInputSingle name="media_id" required />
            </Pane>
            <MediaInputMany name="media" />
        </TabPane>
    );
};
