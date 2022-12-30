import React from "react";
import { FormField, majorScale, Pane } from "evergreen-ui";
import {
    CountriesSelect,
    DatePicker,
    MediaInputMany,
    MediaInputSingle,
    RegionsSelect,
    TabPane,
    TranslatableTextEditorInput,
    TranslatableTextInput,
    TextInput,
    TextAreaInput,
    SelectInput,
} from "shared/ui";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
].map((month, index) => ({ label: month, value: index + 1 }));

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextInput
                    name="name"
                    label="Event name"
                    placeholder="Enter event name..."
                    required
                />
                <TranslatableTextInput
                    name="date_event"
                    label="Event date"
                    placeholder="Enter event date..."
                    required
                />
                <SelectInput
                    name="month"
                    required={true}
                    options={months}
                    title="Month"
                    label="Month"
                    buttonText="Select month to order events by"
                    hasFilter={false}
                    height={180}
                />
                <TextAreaInput label="Contact Person" name="contact_person" />
                <TranslatableTextEditorInput
                    name="address"
                    label="Event address"
                    placeholder="Enter event address..."
                    rows={3}
                />
                <TranslatableTextEditorInput
                    name="description"
                    label="Event description"
                    placeholder="Enter event description..."
                    rows={7}
                />
                <TranslatableTextInput
                    name="organized"
                    label="Event organized by"
                    placeholder="Enter organizer..."
                />
                <CountriesSelect />
                <RegionsSelect />
            </Pane>
            <FormField label="Image for events list">
                <MediaInputSingle name="image_id" required />
            </FormField>
            <FormField label="Images for gallery">
                <MediaInputMany name="media" />
            </FormField>
        </TabPane>
    );
};
