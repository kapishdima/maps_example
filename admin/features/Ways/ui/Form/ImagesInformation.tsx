import React from "react";
import { FormField, Pane } from "evergreen-ui";
import {
    FileInput,
    MediaInputMany,
    MediaInputSingle,
    TabPane,
} from "shared/ui";

export const ImagesInformation: React.FC = () => {
    return (
        <TabPane tab="Images Information" index={1}>
            <Pane width="70%">
                <MediaInputSingle name="image_id" label="Image" />
                <MediaInputSingle name="thumbnail_id" label="Thumbnail" />
            </Pane>
            <FormField label="Gallery">
                <MediaInputMany name="gallery" />
            </FormField>
            <FormField label="Slider">
                <MediaInputMany name="media" />
            </FormField>
        </TabPane>
    );
};
