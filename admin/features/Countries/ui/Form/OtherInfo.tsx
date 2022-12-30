import { Button, Pane, SelectMenu } from "evergreen-ui";
import React from "react";
import { TabPane, TranslatableTextEditorInput } from "shared/ui";

export const OtherInfo: React.FC = () => {
    return (
        <TabPane index={1} tab="Other Info">
            <Pane width="70%">
                <TranslatableTextEditorInput
                    name="first_block_title"
                    label="First block title"
                    placeholder="..."
                    rows={3}
                />
                <TranslatableTextEditorInput
                    name="first_block_text"
                    label="First block text"
                    placeholder="..."
                    rows={5}
                />
                <TranslatableTextEditorInput
                    name="second_block_text"
                    label="Second block text"
                    placeholder="..."
                    rows={5}
                />
                <TranslatableTextEditorInput
                    name="slider_block_title"
                    label="Slider block title"
                    placeholder="..."
                    rows={3}
                />
                <TranslatableTextEditorInput
                    name="slider_block_text"
                    label="Slider block text"
                    placeholder="..."
                    rows={3}
                />
                <TranslatableTextEditorInput
                    name="partner_title"
                    label="Partner block title"
                    placeholder="..."
                />
                <TranslatableTextEditorInput
                    name="partner_text"
                    label="Partner block text"
                    placeholder="..."
                />
                <TranslatableTextEditorInput
                    name="grape_varieties_title"
                    label="Grape varieties page title"
                    placeholder="..."
                />
                <TranslatableTextEditorInput
                    name="grape_varieties_text"
                    label="Grape varieties page text"
                    placeholder="..."
                />
            </Pane>
        </TabPane>
    );
};
