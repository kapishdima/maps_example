import { Button, FormField, Pane, SelectMenu } from "evergreen-ui";
import React from "react";
import {
    MediaInputSingle,
    TabPane,
    TextInput,
    TranslatableTextEditorInput,
    CodeInput,
} from "shared/ui";

export const OtherInfo: React.FC = () => {
    return (
        <TabPane index={1} tab="Other Info">
            <Pane width="70%">
                <TextInput name="facebook_url" label="Facebook url" />
                <TextInput name="instagram_url" label="Instagram url" />
                <TranslatableTextEditorInput
                    name="footer_text"
                    label="Footer text"
                    isInline
                />

                <FormField label="Blog main image">
                    <MediaInputSingle name="blog_main_image" />
                </FormField>
                <CodeInput name="head_html" label="HTML for the head section" />
                <CodeInput
                    name="after_body_start_html"
                    label="HTML after the body start"
                />
                <CodeInput
                    name="before_body_end_html"
                    label="HTML before the body end"
                />
            </Pane>
        </TabPane>
    );
};
