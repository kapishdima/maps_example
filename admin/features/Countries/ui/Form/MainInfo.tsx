import React from "react";
import { FormField, majorScale, Pane } from "evergreen-ui";
import {
    MediaInputSingle,
    MediaInputMany,
    TabPane,
    TextInput,
    TextAreaInput,
    TranslatableTextInput,
} from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextInput
                    name="name"
                    label="Name"
                    placeholder="..."
                />
                <FormField label="Thumbnail">
                    <MediaInputSingle name="thumbnail" />
                </FormField>
                <FormField label="Main Image">
                    <MediaInputSingle name="main_image" />
                </FormField>

                <FormField label="Secondary Image">
                    <MediaInputSingle name="secondary_image" />
                </FormField>
                <FormField label="Partner logo">
                    <MediaInputSingle name="partner_logo" />
                </FormField>
                <TextInput
                    name="partners_url"
                    label="Partners url"
                    placeholder={"Enter partners url..."}
                />
                <FormField label="Second block image">
                    <MediaInputSingle name="second_block_image" />
                </FormField>
                <FormField label="Wineries list page main image">
                    <MediaInputSingle name="wineries_list_image" />
                </FormField>
                <FormField label="Routes list page main image">
                    <MediaInputSingle name="routes_list_image" />
                </FormField>
                <FormField label="Events list page main image">
                    <MediaInputSingle name="events_list_image" />
                </FormField>
                <FormField label="Agencies list page main image">
                    <MediaInputSingle name="travel_agencies_list_image" />
                </FormField>
                <FormField label="Grape types list page main image">
                    <MediaInputSingle name="grapes_list_image" />
                </FormField>
            </Pane>
            <FormField label="Gallery images">
                <MediaInputMany name="gallery" />
            </FormField>
            <FormField label="Slider images">
                <MediaInputMany />
            </FormField>
        </TabPane>
    );
};
