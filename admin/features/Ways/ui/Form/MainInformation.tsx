import { Pane } from "evergreen-ui";
import React from "react";
import {
    CountriesSelect,
    TabPane,
    TranslatableTextEditorInput,
    TranslatableTextInput,
} from "shared/ui";

export const MainInformation: React.FC = () => {
    return (
        <TabPane tab="Main Information" index={0}>
            <Pane width="70%">
                <CountriesSelect />
                <TranslatableTextInput
                    name="name"
                    label="Way name"
                    placeholder="Enter way name..."
                    required
                />
                <TranslatableTextEditorInput
                    name="text"
                    label="Way text"
                    placeholder="Enter way text..."
                    required
                />
                <TranslatableTextInput
                    name="middle_title"
                    label="Middle Title"
                    placeholder="Enter middle title..."
                />
                <TranslatableTextEditorInput
                    name="middle_text"
                    label="Middle text"
                    placeholder="Enter middle text..."
                />
            </Pane>
        </TabPane>
    );
};
