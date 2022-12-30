import React from "react";
import { FormField, Heading, majorScale, Pane } from "evergreen-ui";
import {
    MediaInputMany,
    MediaInputSingle,
    TabPane,
    TranslatableTextEditorInput,
} from "shared/ui";
import { useCommonDataContext } from "app/hooks";

const countries = ["Armenia", "Georgia", "Ukraine", "Greece"];

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <FormField label="Black Sea main header image">
                    <MediaInputSingle name="black_sea_image" />
                </FormField>
                <TranslatableTextEditorInput
                    name="black_sea_slider_title"
                    label="Black sea page slider title"
                    placeholder="..."
                    isInline
                />
                <TranslatableTextEditorInput
                    name="black_sea_slider_text"
                    label="Black sea page slider text"
                    placeholder="..."
                    isInline
                />
                <FormField label="Black sea slider">
                    <MediaInputMany name="black_sea_slider" />
                </FormField>
                <TranslatableTextEditorInput
                    name="black_sea_main_text"
                    label="Black sea page main text"
                    placeholder="..."
                    isInline
                />
            </Pane>
            {countries.map((country, index) => {
                return (
                    <Pane width="70%" marginTop={majorScale(4)}>
                        <Heading
                            is="h2"
                            size={800}
                            style={{
                                textTransform: "capitalize",
                                marginBottom: "20px",
                            }}
                        >
                            {country}
                        </Heading>
                        <TranslatableTextEditorInput
                            name={`countriesData.${index}.black_sea_text`}
                            label="Black sea page text"
                            placeholder="..."
                            isInline
                        />
                        <FormField label="Black sea image of specific country">
                            <MediaInputSingle
                                name={`countriesData.${index}.black_sea_image`}
                            />
                        </FormField>
                    </Pane>
                );
            })}
        </TabPane>
    );
};
