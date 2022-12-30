import React from "react";
import { FormField, majorScale, Pane } from "evergreen-ui";
import {
    CountriesSelect,
    MediaInputSingle,
    TabPane,
    TextInput,
    TranslatableTextEditorInput,
    TranslatableTextInput,
} from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextInput
                    name="name"
                    label="Agency name"
                    placeholder="Enter agency name..."
                    required
                />
                <TranslatableTextInput
                    name="contact_person"
                    label="Agency Contact person"
                    placeholder="Enter agency name..."
                />
                <TranslatableTextInput
                    name="address"
                    label="Agency address"
                    placeholder="Enter agency address..."
                />
                <TranslatableTextInput
                    name="region"
                    label="Agency region"
                    placeholder="Enter agency region..."
                />
                <TranslatableTextEditorInput
                    name="description"
                    label="Agency description"
                    placeholder="Enter agency description..."
                    rows={5}
                />

                <CountriesSelect />

                <TextInput
                    name="email"
                    label="Agency email"
                    placeholder="Enter agency email..."
                />

                <TextInput
                    name="website"
                    label="Agency website"
                    placeholder="Enter agency website..."
                />

                <TextInput
                    name="telephone"
                    label="Agency telephone"
                    placeholder="Enter agency telephone..."
                />
                <FormField label="Main image">
                    <MediaInputSingle name="media_id" required />
                </FormField>
            </Pane>
        </TabPane>
    );
};
