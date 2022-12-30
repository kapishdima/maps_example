import { Pane } from "evergreen-ui";
import React from "react";
import { FormGroup, TabPane, TranslatableTextInput } from "shared/ui";

export const PlaceInfoTab: React.FC = () => {
    return (
        <TabPane index={1} tab="Place Information">
            <Pane width="70%">
                <TranslatableTextInput
                    name="can_visit"
                    label="Can Visit"
                    placeholder="Enter can visit place..."
                />
                <TranslatableTextInput
                    name="nearby_accommodation"
                    label="Nearby Accommodation"
                    placeholder="Enter nearby accommodation..."
                />
                <TranslatableTextInput
                    name="size"
                    label="Size"
                    placeholder="Enter winery size..."
                />
                <TranslatableTextInput
                    name="farm_management"
                    label="Farm Management"
                    placeholder="Enter farm management..."
                />
                <TranslatableTextInput
                    name="other_tour"
                    label="Other Tour"
                    placeholder="Enter other tours..."
                />
            </Pane>
        </TabPane>
    );
};
