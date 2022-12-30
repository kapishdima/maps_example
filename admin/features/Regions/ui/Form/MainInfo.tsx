import React from "react";
import { majorScale, Pane } from "evergreen-ui";
import { CountriesSelect, TabPane, TranslatableTextInput } from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextInput
                    name="name"
                    label="name"
                    placeholder="..."
                />
                <CountriesSelect />
            </Pane>
        </TabPane>
    );
};
