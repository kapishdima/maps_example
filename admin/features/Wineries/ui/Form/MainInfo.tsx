import React from "react";
import { FormField, majorScale, Pane } from "evergreen-ui";
import {
    CountriesSelect,
    MediaInputMany,
    MediaInputSingle,
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
                    label="Winery name"
                    placeholder="Enter winery name..."
                    required
                />
                <TranslatableTextEditorInput
                    name="description"
                    label="Winery description"
                />
                <TranslatableTextInput
                    name="slider_title"
                    label="Slider title"
                    placeholder="Enter slider title..."
                />
                <TranslatableTextEditorInput
                    name="slider_text"
                    label="Slider text"
                    placeholder="Enter slider text..."
                />
                <CountriesSelect />
            </Pane>
            <FormField label="Main Image on the winery page">
                <MediaInputSingle name="image_id" />
            </FormField>
            <FormField label="Thumbnail for the page that list wineries">
                <MediaInputSingle name="thumbnail" />
            </FormField>
            <FormField label="Images for gallery">
                <MediaInputMany />
            </FormField>
        </TabPane>
    );
};
