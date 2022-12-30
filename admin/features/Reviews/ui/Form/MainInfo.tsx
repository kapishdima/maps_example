import React from "react";
import { majorScale, Pane } from "evergreen-ui";
import {
    SelectInput,
    TabPane,
    TranslatableTextEditorInput,
    WineriesSelect,
} from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextEditorInput
                    name="comment"
                    label="Review text"
                    placeholder="..."
                />
                <WineriesSelect />
                <SelectInput
                    name="rating"
                    label="Rating"
                    options={[
                        { value: 1, label: "1" },
                        { value: 1.5, label: "1.5" },
                        { value: 2, label: "2" },
                        { value: 2.5, label: "2.5" },
                        { value: 3, label: "3" },
                        { value: 4, label: "4" },
                        { value: 4.5, label: "4.5" },
                        { value: 5, label: "5" },
                    ]}
                />
            </Pane>
        </TabPane>
    );
};
