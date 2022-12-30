import React from "react";
import { majorScale, Pane } from "evergreen-ui";
import {
    TabPane,
    TextInput,
    TranslatableTextAreaInput,
    TranslatableTextEditorInput,
    TranslatableTextInput,
} from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextInput
                    name="title"
                    label="Title"
                    placeholder="..."
                    isInline
                />
                <TranslatableTextAreaInput
                    name="description"
                    label="Description"
                    placeholder="..."
                    isInline
                />
                <TranslatableTextInput
                    name="keywords"
                    label="Keywords"
                    placeholder="..."
                    isInline
                />
                <TextInput name="slug" label="Slug" placeholder="..." />
            </Pane>
        </TabPane>
    );
};
