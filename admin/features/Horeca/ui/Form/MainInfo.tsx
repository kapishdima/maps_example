import React from "react";
import { FormField, majorScale, Pane } from "evergreen-ui";
import {
    CountriesSelect,
    MediaInputMany,
    SelectInput,
    TabPane,
    TranslatableTextEditorInput,
} from "shared/ui";

const types = [
    { value: "hotel", label: "Hotel" },
    { value: "restaurant", label: "Restaurant" },
    { value: "cafe_wine_bar", label: "Cafe&Wine bar" },
    { value: "cooperations", label: "Cooperations" },
    { value: "open_farm", label: "Open farm" },
    { value: "hotel_restaurant", label: "Hotel&Restaurant" },
    { value: "small_restaurant", label: "Small restaurant" },
    { value: "wine_bar", label: "Wine bar" },
    { value: "family_style_restaurant", label: "Family style restaurant" },
    { value: "steakhouse", label: "Steakhouse" },
    { value: "armenian_restaurant", label: "Armenian restaurant" },
];
export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextEditorInput
                    name="name"
                    label="Name"
                    placeholder="Enter horeca name..."
                    rows={3}
                    required
                />
                <TranslatableTextEditorInput
                    name="description"
                    label="Description"
                    placeholder="Enter horeca description..."
                    rows={5}
                    required
                />
                <CountriesSelect />
                <TranslatableTextEditorInput
                    name="types_of_events"
                    label="Events here..."
                    placeholder="Enter events..."
                    rows={5}
                />
                <SelectInput
                    name="type"
                    label="Type of HoReCa"
                    options={types}
                />
            </Pane>
            <FormField label="HoReCa gallery">
                <MediaInputMany name="media" />
            </FormField>
        </TabPane>
    );
};
